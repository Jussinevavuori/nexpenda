/**
 * Converts an excel serial date
 *
 * `ddddd.ttttt` where `ddddd` is the integer amount of days since
 * January 0, 1900 (including 29.2.1900 which does not exist) and
 * `ttttt` is the fraction of a 24-hour day.
 *
 * Thank you to stackoverflow user silkfire
 * https://stackoverflow.com/questions/16229494/converting-excel-date-serial-number-to-date-using-javascript
 *
 * @param serial Excel date serial number
 */
export function excelDateToJSDate(serial: number) {
  var utc_days = Math.floor(serial - 25569);
  var utc_value = utc_days * 86400;
  var date_info = new Date(utc_value * 1000);

  var fractional_day = serial - Math.floor(serial) + 0.0000001;

  var total_seconds = Math.floor(86400 * fractional_day);

  var seconds = total_seconds % 60;

  total_seconds -= seconds;

  var hours = Math.floor(total_seconds / (60 * 60));
  var minutes = Math.floor(total_seconds / 60) % 60;

  return new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    hours,
    minutes,
    seconds
  );
}
