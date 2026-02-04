import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Smartphone,
  Wallet,
  Clock,
  Shield,
  Lock,
  Check,
  ChevronRight,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

type PaymentMethod = "upi" | "card" | "wallet" | "paylater";

const paymentMethods = [
  {
    id: "upi" as const,
    name: "UPI",
    icon: Smartphone,
    description: "Pay using UPI apps",
    logos: ["Google Pay", "PhonePe", "Paytm"],
  },
  {
    id: "card" as const,
    name: "Credit / Debit Card",
    icon: CreditCard,
    description: "All major cards accepted",
    logos: ["Visa", "Mastercard", "RuPay"],
  },
  {
    id: "wallet" as const,
    name: "Wallets",
    icon: Wallet,
    description: "Paytm, PhonePe & more",
    logos: ["Paytm Wallet", "PhonePe Wallet"],
  },
  {
    id: "paylater" as const,
    name: "Pay Later",
    icon: Clock,
    description: "Buy now, pay later",
    logos: ["Simpl", "LazyPay", "ZestMoney"],
  },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi");
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    upiId: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",
    cardName: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      navigate("/order-success");
    }, 2000);
  };

  const deliveryFee = totalPrice >= 500 ? 0 : 50;
  const finalTotal = totalPrice + deliveryFee;

  if (items.length === 0) {
    return (
      <Layout>
        <section className="pt-32 pb-20 min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="heading-section text-foreground mb-4">
              No items to checkout
            </h1>
            <Link to="/products" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-28 pb-20 min-h-screen bg-gradient-nature">
        <div className="container-luxury px-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Cart</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Delivery Address */}
              <div className="glass-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Delivery Address
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="input-luxury"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="input-luxury"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="input-luxury"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House no., Street, Area"
                      className="input-luxury"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Your city"
                      className="input-luxury"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      PIN Code
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="400001"
                      className="input-luxury"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="glass-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h2 className="font-display text-xl font-semibold text-foreground">
                    Payment Method
                  </h2>
                </div>

                <div className="space-y-3">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={cn(
                        "w-full p-4 rounded-xl border-2 transition-all duration-300 text-left",
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div
                            className={cn(
                              "w-12 h-12 rounded-xl flex items-center justify-center",
                              paymentMethod === method.id
                                ? "bg-primary text-primary-foreground"
                                : "bg-secondary text-secondary-foreground"
                            )}
                          >
                            <method.icon className="w-6 h-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">
                              {method.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {method.description}
                            </p>
                          </div>
                        </div>
                        <div
                          className={cn(
                            "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                            paymentMethod === method.id
                              ? "border-primary bg-primary"
                              : "border-muted-foreground"
                          )}
                        >
                          {paymentMethod === method.id && (
                            <Check className="w-3 h-3 text-primary-foreground" />
                          )}
                        </div>
                      </div>

                      {/* Payment Logos */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {method.logos.map((logo) => (
                          <span
                            key={logo}
                            className="px-2 py-1 rounded-md bg-secondary text-xs font-medium text-secondary-foreground"
                          >
                            {logo}
                          </span>
                        ))}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Payment Details */}
                <div className="mt-6">
                  {paymentMethod === "upi" && (
                    <div className="space-y-4 animate-fade-in">
                      <label className="block text-sm font-medium text-foreground mb-2">
                        UPI ID
                      </label>
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        placeholder="yourname@upi"
                        className="input-luxury"
                      />
                      <p className="text-xs text-muted-foreground">
                        Enter your UPI ID linked with any UPI app
                      </p>
                    </div>
                  )}

                  {paymentMethod === "card" && (
                    <div className="space-y-4 animate-fade-in">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          className="input-luxury"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="Name on card"
                          className="input-luxury"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            className="input-luxury"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            CVV
                          </label>
                          <input
                            type="password"
                            name="cardCvv"
                            value={formData.cardCvv}
                            onChange={handleInputChange}
                            placeholder="•••"
                            className="input-luxury"
                            maxLength={4}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "wallet" && (
                    <div className="animate-fade-in text-center py-8">
                      <p className="text-muted-foreground">
                        You'll be redirected to your wallet app to complete the payment
                      </p>
                    </div>
                  )}

                  {paymentMethod === "paylater" && (
                    <div className="animate-fade-in text-center py-8">
                      <p className="text-muted-foreground">
                        Choose your preferred Pay Later option at the final step
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Security Badges */}
              <div className="flex flex-wrap items-center justify-center gap-6 py-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-sm">Secure Payment</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Lock className="w-5 h-5 text-primary" />
                  <span className="text-sm">256-bit SSL Encryption</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="glass-card sticky top-28">
                <h2 className="font-display text-xl font-semibold text-foreground mb-6">
                  Order Summary
                </h2>

                {/* Items */}
                <div className="space-y-3 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground line-clamp-1">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-foreground">
                        ₹{item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-border mb-6" />

                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Delivery</span>
                    <span
                      className={
                        deliveryFee === 0 ? "text-primary font-medium" : ""
                      }
                    >
                      {deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-xs text-muted-foreground">
                      Add ₹{500 - totalPrice} more for free delivery
                    </p>
                  )}
                  <div className="h-px bg-border" />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-foreground">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{finalTotal}
                    </span>
                  </div>
                </div>

                {/* Pay Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing}
                  className={cn(
                    "w-full btn-gold justify-center",
                    isProcessing && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Pay ₹{finalTotal}
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-muted-foreground mt-4">
                  By placing this order, you agree to our Terms & Conditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
