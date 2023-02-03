import GetLink from '../store/store';

const ResolveTinyLink = async (hash: string): Promise<string> => {
    const url = await GetLink(hash);
    if (url === "") {
        throw new Error("no tiny url found")
    }
    return url;
};

export { ResolveTinyLink as default }