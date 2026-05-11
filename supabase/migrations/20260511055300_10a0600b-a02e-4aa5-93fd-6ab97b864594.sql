
CREATE TABLE public.project_likes (
  project_id TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.project_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read likes" ON public.project_likes FOR SELECT USING (true);

CREATE TABLE public.project_like_voters (
  project_id TEXT NOT NULL,
  voter_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (project_id, voter_id)
);

ALTER TABLE public.project_like_voters ENABLE ROW LEVEL SECURITY;

-- Atomic toggle function (security definer to bypass RLS for writes)
CREATE OR REPLACE FUNCTION public.toggle_project_like(p_project_id TEXT, p_voter_id TEXT)
RETURNS TABLE(count INTEGER, liked BOOLEAN)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_existing INTEGER;
  v_count INTEGER;
  v_liked BOOLEAN;
BEGIN
  SELECT 1 INTO v_existing FROM public.project_like_voters
    WHERE project_id = p_project_id AND voter_id = p_voter_id;

  IF v_existing IS NOT NULL THEN
    DELETE FROM public.project_like_voters
      WHERE project_id = p_project_id AND voter_id = p_voter_id;
    INSERT INTO public.project_likes(project_id, count) VALUES (p_project_id, 0)
      ON CONFLICT (project_id) DO NOTHING;
    UPDATE public.project_likes SET count = GREATEST(count - 1, 0), updated_at = now()
      WHERE project_id = p_project_id RETURNING project_likes.count INTO v_count;
    v_liked := false;
  ELSE
    INSERT INTO public.project_like_voters(project_id, voter_id) VALUES (p_project_id, p_voter_id);
    INSERT INTO public.project_likes(project_id, count) VALUES (p_project_id, 1)
      ON CONFLICT (project_id) DO UPDATE SET count = public.project_likes.count + 1, updated_at = now()
      RETURNING project_likes.count INTO v_count;
    v_liked := true;
  END IF;

  RETURN QUERY SELECT v_count, v_liked;
END;
$$;

GRANT EXECUTE ON FUNCTION public.toggle_project_like(TEXT, TEXT) TO anon, authenticated;
