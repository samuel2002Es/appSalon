import { parse, formatISO } from 'date-fns'

export function converToISO(strDate){
    const newDate = parse(strDate, 'dd/MM/yyyy', new Date());
    //console.log(formatISO(newDate));
    return formatISO(newDate)
}