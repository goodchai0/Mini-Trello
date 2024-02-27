export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', };
    const date = new Date(dateString);
    const day = date.getDate();
    let dayString;
  
    // Determine the suffix for the day (e.g., "1st", "2nd", "3rd", "4th", etc.)
    if (day % 10 === 1 && day !== 11) {
      dayString = `${day}st`;
    } else if (day % 10 === 2 && day !== 12) {
      dayString = `${day}nd`;
    } else if (day % 10 === 3 && day !== 13) {
      dayString = `${day}rd`;
    } else {
      dayString = `${day}th`;
    }
  
    return `${dayString} ${date.toLocaleDateString('en-US', options)}`;
  };
  