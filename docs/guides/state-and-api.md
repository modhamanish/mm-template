---
sidebar_position: 3
title: State Management & API
description: Server state with TanStack Query v5 and Axios in MMTemplate
---

# ⚡ State Management & API

MMTemplate comes with **TanStack Query (React Query v5)** and **Axios** pre-configured for handling server data, automatic background caching, optimistic updates, and clean hook abstractions.

---

## 🌐 Pre-configured Axios Instance

Located in `src/services/axiosInstance.ts`:

- Automatic `Authorization: Bearer <token>` insertion from storage.
- Central error interceptor handling 401 Unauthorized, 403 Forbidden, and network timeouts.
- Configurable base URL via environment variables.

---

## 🎣 Custom Query Hooks Example

Queries are abstracted into custom hooks for clean component code. See `src/services/note.query.ts`:

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKeys';
import { api } from './axiosInstance';

// 1. Fetching notes
export const useNotes = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.NOTES],
    queryFn: async () => {
      const response = await api.get('/notes');
      return response.data;
    },
  });
};

// 2. Creating a note
export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newNote: { title: string; content: string }) => {
      const response = await api.post('/notes', newNote);
      return response.data;
    },
    onSuccess: () => {
      // Invalidate cache to refetch updated list
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.NOTES] });
    },
  });
};
```

---

## 🧪 Built-in Mock API Support

To allow immediate prototyping before your backend is ready, MMTemplate includes a mock data layer in `src/mock/index.ts`. You can build screens and test pagination, error states, and mutations without waiting for backend endpoints.
