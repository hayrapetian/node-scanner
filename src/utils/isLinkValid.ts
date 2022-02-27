export const isLinkValid = (url: string, link: string | undefined) => {
    if (url === link) return false
    const domain = (new URL(url));
    const websiteUrl = domain.hostname.replace('www.','');
    if (link?.startsWith('http')){
        const scannedDomain = (new URL(link));
        const scannedWebsiteUrl = scannedDomain.hostname.replace('www.','');
        if (websiteUrl === scannedWebsiteUrl) {
            return true
        }
    }
    return false
}