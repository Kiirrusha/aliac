interface BadRequestError {
  eventType: "error";
  data: {
    error: string;
    description: string;
  };
}

const createError = (name: string, description: string): BadRequestError => {
  return {
    eventType: "error",
    data: {
      error: name,
      description,
    },
  };
};

const isError = (error: unknown): error is BadRequestError => {
  return (error as BadRequestError).eventType === "error";
};
