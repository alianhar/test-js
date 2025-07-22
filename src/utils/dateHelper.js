export class DateHelper {
  static formatDate(date, locale = 'id-ID') {
    return new Date(date).toLocaleDateString(locale);
  }

  static formatDateTime(date, locale = 'id-ID') {
    return new Date(date).toLocaleString(locale);
  }

  static isToday(date) {
    const today = new Date();
    const checkDate = new Date(date);
    return today.toDateString() === checkDate.toDateString();
  }

  static daysSince(date) {
    const now = new Date();
    const past = new Date(date);
    const diffTime = Math.abs(now - past);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  static formatRelativeTime(date) {
    const days = this.daysSince(date);
    if (days === 0) return 'Hari ini';
    if (days === 1) return 'Kemarin';
    if (days < 7) return `${days} hari yang lalu`;
    if (days < 30) return `${Math.floor(days / 7)} minggu yang lalu`;
    return `${Math.floor(days / 30)} bulan yang lalu`;
  }
}