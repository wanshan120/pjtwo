const errorHandler = (error: { data?: { [key: string]: string[] } }, fallbackMessage: string) =>
  error?.data?.errors ? error.data.errors : { unknown: [fallbackMessage] };

export default errorHandler;
