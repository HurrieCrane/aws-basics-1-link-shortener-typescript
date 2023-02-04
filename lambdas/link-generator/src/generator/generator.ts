import { URL } from 'url';
import { createHash } from 'crypto';
import StoreLink from '../store/store';

const domain = process.env.LINK_DOMAIN ?? "https://link.thestudio.com/"

const GenerateTinyLink = async (link: string): Promise<string> => {
    if (link === "") {
        throw new Error("uri cannot be empty");
    }

    const uri = new URL(link);
    const hash = createHash('sha1').update(uri.toString()).digest('hex');
    const tinyUrl = new URL(`${domain}link/${hash}`).toString()

    await StoreLink(hash, uri.toString());

    return tinyUrl;
};

export { GenerateTinyLink as default }