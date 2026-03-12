// Language/Locale utilities

export type Language = 'en' | 'vi';

export interface Translations {
    // Navigation
    'nav.home': string;
    'nav.movies': string;
    'nav.about': string;
    'nav.contact': string;
    'nav.login': string;
    'nav.signup': string;
    'nav.profile': string;
    'nav.logout': string;
    'nav.admin': string;

    // Hero Section
    'hero.nowPlaying': string;
    'hero.bookTickets': string;
    'hero.rating': string;
    'hero.runtime': string;
    'hero.genre': string;

    // Movies Section
    'movies.title': string;
    'movies.allGenres': string;
    'movies.searchPlaceholder': string;
    'movies.noResults': string;
    'movies.bookNow': string;

    // Booking
    'booking.selectSeats': string;
    'booking.available': string;
    'booking.selected': string;
    'booking.occupied': string;
    'booking.screen': string;
    'booking.summary': string;
    'booking.movie': string;
    'booking.showtime': string;
    'booking.seats': string;
    'booking.total': string;
    'booking.confirm': string;
    'booking.cancel': string;

    // Common
    'common.loading': string;
    'common.error': string;
    'common.success': string;
    'common.confirm': string;
    'common.cancel': string;
    'common.save': string;
    'common.delete': string;
    'common.edit': string;
    'common.search': string;
}

const translations: Record<Language, Translations> = {
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.movies': 'Movies',
        'nav.about': 'About',
        'nav.contact': 'Contact',
        'nav.login': 'Login',
        'nav.signup': 'Sign Up',
        'nav.profile': 'Profile',
        'nav.logout': 'Logout',
        'nav.admin': 'Admin',

        // Hero Section
        'hero.nowPlaying': 'Now Playing',
        'hero.bookTickets': 'Book Tickets',
        'hero.rating': 'Rating',
        'hero.runtime': 'Runtime',
        'hero.genre': 'Genre',

        // Movies Section
        'movies.title': 'Now Showing',
        'movies.allGenres': 'All Genres',
        'movies.searchPlaceholder': 'Search movies...',
        'movies.noResults': 'No movies found',
        'movies.bookNow': 'Book Now',

        // Booking
        'booking.selectSeats': 'Select Your Seats',
        'booking.available': 'Available',
        'booking.selected': 'Selected',
        'booking.occupied': 'Occupied',
        'booking.screen': 'Screen',
        'booking.summary': 'Booking Summary',
        'booking.movie': 'Movie',
        'booking.showtime': 'Showtime',
        'booking.seats': 'Seats',
        'booking.total': 'Total',
        'booking.confirm': 'Confirm Booking',
        'booking.cancel': 'Cancel',

        // Common
        'common.loading': 'Loading...',
        'common.error': 'Error',
        'common.success': 'Success',
        'common.confirm': 'Confirm',
        'common.cancel': 'Cancel',
        'common.save': 'Save',
        'common.delete': 'Delete',
        'common.edit': 'Edit',
        'common.search': 'Search',
    },
    vi: {
        // Navigation
        'nav.home': 'Trang chủ',
        'nav.movies': 'Phim',
        'nav.about': 'Giới thiệu',
        'nav.contact': 'Liên hệ',
        'nav.login': 'Đăng nhập',
        'nav.signup': 'Đăng ký',
        'nav.profile': 'Tài khoản',
        'nav.logout': 'Đăng xuất',
        'nav.admin': 'Quản trị',

        // Hero Section
        'hero.nowPlaying': 'Đang Chiếu',
        'hero.bookTickets': 'Đặt Vé',
        'hero.rating': 'Đánh giá',
        'hero.runtime': 'Thời lượng',
        'hero.genre': 'Thể loại',

        // Movies Section
        'movies.title': 'Phim Đang Chiếu',
        'movies.allGenres': 'Tất cả thể loại',
        'movies.searchPlaceholder': 'Tìm kiếm phim...',
        'movies.noResults': 'Không tìm thấy phim',
        'movies.bookNow': 'Đặt Vé',

        // Booking
        'booking.selectSeats': 'Chọn Ghế Của Bạn',
        'booking.available': 'Còn trống',
        'booking.selected': 'Đã chọn',
        'booking.occupied': 'Đã đặt',
        'booking.screen': 'Màn hình',
        'booking.summary': 'Thông Tin Đặt Vé',
        'booking.movie': 'Phim',
        'booking.showtime': 'Suất chiếu',
        'booking.seats': 'Ghế',
        'booking.total': 'Tổng cộng',
        'booking.confirm': 'Xác Nhận Đặt Vé',
        'booking.cancel': 'Hủy',

        // Common
        'common.loading': 'Đang tải...',
        'common.error': 'Lỗi',
        'common.success': 'Thành công',
        'common.confirm': 'Xác nhận',
        'common.cancel': 'Hủy',
        'common.save': 'Lưu',
        'common.delete': 'Xóa',
        'common.edit': 'Sửa',
        'common.search': 'Tìm kiếm',
    },
};

export const getTranslation = (key: keyof Translations, language: Language = 'en'): string => {
    return translations[language][key] || key;
};

export const t = getTranslation; // Shorthand
