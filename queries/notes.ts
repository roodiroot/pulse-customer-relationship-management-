import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { createNote } from "@/actions/notes/create-note";
import { showNotes } from "@/actions/notes/show-notes";

export const useFetchNotes = (contactId: string) => {
  return useQuery({
    queryKey: ["notes", contactId],
    queryFn: () => showNotes(contactId),
  });
};

// Mutations
export const useCreateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });
};
