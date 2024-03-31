export interface BadRequestError {
  eventType: "error";
  data: {
    error: string;
    description: string;
  };
}

export const createError = (name: string, description: string): BadRequestError => {
  return {
    eventType: "error",
    data: {
      error: name,
      description,
    },
  };
};

export const isError = (error: unknown): error is BadRequestError => {
  return (error as BadRequestError).eventType === "error";
};
