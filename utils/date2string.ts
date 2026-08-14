


function num2month(month: number): string | undefined {
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return months[month];
}


export default function date2string(idate: string){
    const date = new Date(idate);
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return(
        num2month(date.getMonth()) + " " + date.getDate() + ", " + (year != new Date().getFullYear() ? year : "") + "at " + (hours < 10 ? "0"+ hours : hours) + ":" + (minutes < 10 ? "0"+ minutes : minutes)
    );
}