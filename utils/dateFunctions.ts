import { formatDistanceToNow } from "date-fns"
import { enUS } from "date-fns/locale";

export const getFormatDistanceToNow = (date: number) => {
    const fromNow = formatDistanceToNow(date, {locale: enUS});

    return `${fromNow} ago`;
}