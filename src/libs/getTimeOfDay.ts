export const getTimeOfDay = () => {
    const currentHour = new Date().getHours()
    let timeOfDay

    if (currentHour > 4 && currentHour < 12) {
        timeOfDay = 'morning'
    } else if (currentHour >= 12 && currentHour < 18) {
        timeOfDay = 'afternoon'
    } else if (currentHour <= 4 || currentHour >= 18) {
        timeOfDay = 'evening'
    }

    return timeOfDay as string
}