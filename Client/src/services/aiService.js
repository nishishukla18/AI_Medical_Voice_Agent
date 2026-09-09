import api from "./api";

export const askAI = async (
  query,
  language = "English"
) => {
  const response = await api.post(
    "/api/ai/chat",
    {
      query,
      language,
    }
  );

  return response.data;
};

export const getMoodHistory = async () => {
  const response = await api.get(
    "/api/moods"
  );

  return response.data.moods;
};