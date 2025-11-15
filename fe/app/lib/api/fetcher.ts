export const fetcher = async (url: string) => {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`);
}
  
