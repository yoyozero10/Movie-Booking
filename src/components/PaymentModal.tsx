import { useState } from "react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPaymentSuccess: () => void;
    bookingDetails: {
        movieTitle: string;
        theaterName: string;
        theaterLocation: string;
        date: string;
        time: string;
        seats: string[];
        totalPrice: number;
    };
}

type PaymentMethod = "atm" | "momo" | "zalopay" | "vnpay";

export function PaymentModal({
    isOpen,
    onClose,
    onPaymentSuccess,
    bookingDetails,
}: PaymentModalProps) {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("momo");
    const [cardNumber, setCardNumber] = useState("");
    const [cardName, setCardName] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [processing, setProcessing] = useState(false);

    if (!isOpen) return null;

    const formatCardNumber = (value: string) => {
        const cleaned = value.replace(/\s/g, "");
        const chunks = cleaned.match(/.{1,4}/g);
        return chunks ? chunks.join(" ") : cleaned;
    };

    const formatExpiryDate = (value: string) => {
        const cleaned = value.replace(/\D/g, "");
        if (cleaned.length >= 2) {
            return cleaned.slice(0, 2) + "/" + cleaned.slice(2, 4);
        }
        return cleaned;
    };

    const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\s/g, "");
        if (value.length <= 16 && /^\d*$/.test(value)) {
            setCardNumber(formatCardNumber(value));
        }
    };

    const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, "");
        if (value.length <= 4) {
            setExpiryDate(formatExpiryDate(value));
        }
    };

    const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length <= 3 && /^\d*$/.test(value)) {
            setCvv(value);
        }
    };

    const handlePayment = async () => {
        // Validate form for ATM card
        if (paymentMethod === "atm") {
            if (!cardNumber || !cardName || !expiryDate || !cvv) {
                toast.error("Vui lòng điền đầy đủ thông tin thẻ");
                return;
            }

            if (cardNumber.replace(/\s/g, "").length !== 16) {
                toast.error("Số thẻ không hợp lệ");
                return;
            }

            if (cvv.length !== 3) {
                toast.error("Mã CVV không hợp lệ");
                return;
            }
        }

        setProcessing(true);

        // Simulate payment processing
        setTimeout(() => {
            setProcessing(false);
            toast.success("Thanh toán thành công!");
            onPaymentSuccess();
        }, 2500);
    };

    // Generate QR code data
    const qrData = JSON.stringify({
        method: paymentMethod,
        amount: bookingDetails.totalPrice,
        currency: "USD",
        description: `Vé xem phim ${bookingDetails.movieTitle}`,
        seats: bookingDetails.seats.join(", "),
        theater: bookingDetails.theaterName,
        date: bookingDetails.date,
        time: bookingDetails.time,
        timestamp: Date.now()
    });

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-r from-primary to-purple-600 p-6 rounded-t-2xl">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">Thanh Toán</h2>
                            <p className="text-white/80 text-sm">Hoàn tất đặt vé của bạn</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white/80 hover:text-white transition-colors"
                            disabled={processing}
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left Column - Payment Form */}
                    <div className="space-y-6">
                        {/* Payment Method Selection */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-300 mb-3">
                                Phương Thức Thanh Toán
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                {/* MoMo */}
                                <button
                                    onClick={() => setPaymentMethod("momo")}
                                    className={`p-4 rounded-lg border-2 transition-all ${paymentMethod === "momo"
                                            ? "border-pink-500 bg-pink-500/10"
                                            : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                                        }`}
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${paymentMethod === "momo" ? "bg-pink-500" : "bg-pink-500/50"
                                            }`}>
                                            <span className="text-white font-bold text-lg">M</span>
                                        </div>
                                        <span className={`text-sm font-medium ${paymentMethod === "momo" ? "text-pink-400" : "text-gray-400"
                                            }`}>MoMo</span>
                                    </div>
                                </button>

                                {/* ZaloPay */}
                                <button
                                    onClick={() => setPaymentMethod("zalopay")}
                                    className={`p-4 rounded-lg border-2 transition-all ${paymentMethod === "zalopay"
                                            ? "border-blue-500 bg-blue-500/10"
                                            : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                                        }`}
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${paymentMethod === "zalopay" ? "bg-blue-500" : "bg-blue-500/50"
                                            }`}>
                                            <span className="text-white font-bold text-lg">Z</span>
                                        </div>
                                        <span className={`text-sm font-medium ${paymentMethod === "zalopay" ? "text-blue-400" : "text-gray-400"
                                            }`}>ZaloPay</span>
                                    </div>
                                </button>

                                {/* VNPay */}
                                <button
                                    onClick={() => setPaymentMethod("vnpay")}
                                    className={`p-4 rounded-lg border-2 transition-all ${paymentMethod === "vnpay"
                                            ? "border-red-500 bg-red-500/10"
                                            : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                                        }`}
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${paymentMethod === "vnpay" ? "bg-red-500" : "bg-red-500/50"
                                            }`}>
                                            <span className="text-white font-bold text-sm">VNP</span>
                                        </div>
                                        <span className={`text-sm font-medium ${paymentMethod === "vnpay" ? "text-red-400" : "text-gray-400"
                                            }`}>VNPay</span>
                                    </div>
                                </button>

                                {/* ATM Card */}
                                <button
                                    onClick={() => setPaymentMethod("atm")}
                                    className={`p-4 rounded-lg border-2 transition-all ${paymentMethod === "atm"
                                            ? "border-primary bg-primary/10"
                                            : "border-gray-700 bg-gray-800/50 hover:border-gray-600"
                                        }`}
                                >
                                    <div className="flex flex-col items-center gap-2">
                                        <svg className={`w-12 h-12 ${paymentMethod === "atm" ? "text-primary" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                        </svg>
                                        <span className={`text-sm font-medium ${paymentMethod === "atm" ? "text-primary" : "text-gray-400"
                                            }`}>Thẻ ATM</span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Payment Details */}
                        {paymentMethod === "atm" ? (
                            <div className="bg-gradient-to-br from-primary/20 to-purple-600/20 p-6 rounded-xl border border-primary/30">
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Số Thẻ</label>
                                        <input
                                            type="text"
                                            value={cardNumber}
                                            onChange={handleCardNumberChange}
                                            placeholder="1234 5678 9012 3456"
                                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">Tên Chủ Thẻ</label>
                                        <input
                                            type="text"
                                            value={cardName}
                                            onChange={(e) => setCardName(e.target.value.toUpperCase())}
                                            placeholder="NGUYEN VAN A"
                                            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary uppercase"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Ngày Hết Hạn</label>
                                            <input
                                                type="text"
                                                value={expiryDate}
                                                onChange={handleExpiryChange}
                                                placeholder="MM/YY"
                                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">CVV</label>
                                            <input
                                                type="text"
                                                value={cvv}
                                                onChange={handleCvvChange}
                                                placeholder="123"
                                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="bg-gradient-to-br from-primary/20 to-purple-600/20 p-6 rounded-xl border border-primary/30">
                                <div className="text-center mb-6">
                                    <div className="mb-4">
                                        {paymentMethod === "momo" && (
                                            <div className="w-16 h-16 bg-pink-500 rounded-full mx-auto flex items-center justify-center mb-3">
                                                <span className="text-white font-bold text-2xl">M</span>
                                            </div>
                                        )}
                                        {paymentMethod === "zalopay" && (
                                            <div className="w-16 h-16 bg-blue-500 rounded-full mx-auto flex items-center justify-center mb-3">
                                                <span className="text-white font-bold text-2xl">Z</span>
                                            </div>
                                        )}
                                        {paymentMethod === "vnpay" && (
                                            <div className="w-16 h-16 bg-red-500 rounded-full mx-auto flex items-center justify-center mb-3">
                                                <span className="text-white font-bold text-xl">VNP</span>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {paymentMethod === "momo" && "Quét mã QR MoMo"}
                                        {paymentMethod === "zalopay" && "Quét mã QR ZaloPay"}
                                        {paymentMethod === "vnpay" && "Quét mã QR VNPay"}
                                    </h3>
                                    <p className="text-gray-400 text-sm">Mở ứng dụng và quét mã để thanh toán</p>
                                </div>

                                {/* QR Code */}
                                <div className="bg-white p-6 rounded-xl mb-6 flex justify-center">
                                    <QRCodeSVG
                                        value={qrData}
                                        size={200}
                                        level="H"
                                        includeMargin={true}
                                    />
                                </div>

                                {/* Payment Info */}
                                <div className="space-y-3">
                                    <div className="bg-gray-900/50 rounded-lg p-4">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-400 text-sm">Số tiền thanh toán</span>
                                            <span className="text-white font-bold text-lg">${bookingDetails.totalPrice.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-400 text-sm">Nội dung</span>
                                            <span className="text-white text-sm">Vé {bookingDetails.seats.join(", ")}</span>
                                        </div>
                                    </div>

                                    <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                                        <p className="text-blue-400 text-xs text-center">
                                            💡 Đây là mã QR demo. Nhấn "Thanh Toán" bên dưới để hoàn tất.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Security Notice */}
                        <div className="flex items-start gap-3 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                            <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <div>
                                <p className="text-sm font-medium text-green-400">Thanh Toán An Toàn</p>
                                <p className="text-xs text-green-300/70 mt-1">Thông tin thanh toán được mã hóa và bảo mật</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Booking Summary */}
                    <div className="space-y-6">
                        <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                            <h3 className="text-lg font-bold text-white mb-4">Thông Tin Đặt Vé</h3>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Phim</p>
                                    <p className="text-white font-semibold">{bookingDetails.movieTitle}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-1">Rạp Chiếu</p>
                                    <p className="text-white font-medium">{bookingDetails.theaterName}</p>
                                    <p className="text-sm text-gray-400">{bookingDetails.theaterLocation}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Ngày</p>
                                        <div className="flex items-center gap-2 text-white">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <span className="font-medium">{bookingDetails.date}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400 mb-1">Giờ</p>
                                        <div className="flex items-center gap-2 text-white">
                                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="font-medium">{bookingDetails.time}</span>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400 mb-2">Ghế Đã Chọn</p>
                                    <div className="flex flex-wrap gap-2">
                                        {bookingDetails.seats.map((seat) => (
                                            <span
                                                key={seat}
                                                className="px-3 py-1.5 bg-primary/20 text-primary border border-primary/30 rounded-lg text-sm font-semibold"
                                            >
                                                {seat}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="border-t border-gray-700 my-4"></div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Vé ({bookingDetails.seats.length}x)</span>
                                        <span className="text-white">${bookingDetails.totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Phí tiện lợi</span>
                                        <span className="text-white">$0.00</span>
                                    </div>
                                    <div className="border-t border-gray-700 pt-2 mt-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-bold text-white">Tổng Cộng</span>
                                            <span className="text-2xl font-bold text-primary">
                                                ${bookingDetails.totalPrice.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pay Button */}
                        <button
                            onClick={() => void handlePayment()}
                            disabled={processing}
                            className="w-full py-4 bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-primary/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        >
                            {processing ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    Thanh Toán ${bookingDetails.totalPrice.toFixed(2)}
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
