import axios from "axios";
import cheerio from "cheerio";
import { StatusCodes } from "http-status-codes"
import { isLinkValid, urlRefactor } from "../utils";
import { Output } from '../types'

export const scanWebsite = async (url: string | any, openedUrls: Record<string, boolean>) => {
    try {
        url = urlRefactor(url)
        if (openedUrls[url]) return;
        openedUrls[url] = true;
        const {data, status} = await axios(url);
        if (status === 200) {
            const $ = cheerio.load(data)
            const links = $('a');
            const outputArr: Output = []
            $(links).each((i, link) => {
                let currentLink = $(link).attr('href')
                currentLink = urlRefactor(currentLink)
                const isValid = isLinkValid(url, currentLink)
                if (isValid) {
                    outputArr.push({
                        _website: [url],
                        _link: [currentLink],
                        _statusCode: [StatusCodes.OK]
                    })
                    scanWebsite(currentLink, openedUrls)
                }
            });
            return outputArr
        }
    } catch (error) {
        console.error(`Something went wrong. Please check this error: ${error}`)
    }
}