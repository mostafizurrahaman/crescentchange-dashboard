/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Modal } from "antd";
import star from "../../assets/images/Star Emphasis.png";
import { HiCheckBadge } from "react-icons/hi2";

const SubscriptionCard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openUpgrade = () => setIsModalOpen(true);
  const closeUpgrade = () => setIsModalOpen(false);

  const handleSelectPlan = async (_plan: "focus" | "freedom") => {
    // TODO: wire to your backend/Stripe
    // await fetch("/api/upgrade", { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({ plan }) });
    setIsModalOpen(false);
  };

  return (
    <div className="my-5 grid grid-cols-1 items-start justify-between gap-4 md:grid-cols-3">
      {/* Foundation */}
      <div className="rounded-3xl bg-white p-6 ">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100">
            <img src={star} alt="" className="h-5 w-5" />
          </div>
          <p className="text-2xl font-semibold">Foundation Plan</p>
        </div>

        <div className="my-6 space-y-2 h-40">
          <h1 className="text-4xl font-bold">
            <span className="text-gray-400"> $</span>
            12 <span className="text-sm font-thin text-gray-600">/ month</span>
          </h1>

          <ul className="list-decimal text-lg text-gray-500">
            <li className="flex items-center gap-2">
              <HiCheckBadge className="h-4 w-4" /> Basic donor analytics
            </li>
            <li className="flex items-center gap-2">
              <HiCheckBadge className="h-4 w-4" /> Org profile page
            </li>
            <li className="flex items-center gap-2">
              <HiCheckBadge className="h-4 w-4" />
              Track recurring donations
            </li>
          </ul>
        </div>

        <button className="w-full rounded-3xl bg-purple-500 py-4 text-white">
          Get Started
        </button>
      </div>

      {/* Focus */}
      <div className="rounded-3xl bg-white p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100">
            <img src={star} alt="" className="h-5 w-5" />
          </div>
          <p className="text-2xl font-semibold">Focus Plan</p>
          <button
            className="rounded-3xl bg-green-500 px-2 py-1 text-white"
            aria-label="Current plan"
          >
            Active Plan
          </button>
        </div>

        <div className="my-6 space-y-2">
          <h1 className="text-4xl font-bold">
            <span className="text-gray-400"> $</span>
            20 <span className="text-sm font-thin text-gray-600">/ month</span>
          </h1>

          <ul className="list-decimal text-lg text-gray-500">
            <li className="flex items-center gap-2">
              <HiCheckBadge className="h-4 w-4" /> Everything in Basic, and
              more.
            </li>
            <li className="flex items-center gap-2">
              <HiCheckBadge className="h-4 w-4" /> Advanced donation filters.
            </li>
            <li className="flex items-center gap-2">
              <HiCheckBadge className="h-4 w-4" />
              Monthly deposit reports.
            </li>
            <li className="flex items-center gap-2">
              <HiCheckBadge className="h-4 w-4" />
              Real-time donation tracking.
            </li>
          </ul>
        </div>

        <button className="w-full rounded-3xl border-2 border-purple-500 py-4 font-bold text-purple-500">
          Cancel Subscription
        </button>
      </div>

      {/* Freedom */}
      <div className="rounded-3xl bg-white p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100">
            <img src={star} alt="" className="h-5 w-5" />
          </div>
          <p className="text-2xl font-semibold">Freedom Plan</p>
        </div>

        <div className="my-6 space-y-2">
          <h1 className="text-4xl font-bold">
            <span className="text-gray-400"> $</span>
            40 <span className="text-sm font-thin text-gray-600">/ month</span>
          </h1>

          <ul className="list-decimal text-lg text-gray-500">
            <li className="flex items-center gap-2">
              <HiCheckBadge className="h-4 w-4" />
              Access to donation dashboard.
            </li>
            <li className="flex items-center gap-2">
              <HiCheckBadge className="h-4 w-4" /> View donor analytics.
            </li>
            <li className="flex items-center gap-2">
              <HiCheckBadge className="h-4 w-4" />
              Priority support.
            </li>
            <li className="flex items-center gap-2">
              <HiCheckBadge className="h-4 w-4" />
              Real-time donation tracking.
            </li>
          </ul>
        </div>

        <button
          className="w-full rounded-3xl bg-purple-500 py-4 text-white"
          onClick={openUpgrade}
        >
          Upgrade
        </button>
      </div>

      {/* -------- Ant Design Modal (Tailwind-styled content) -------- */}
      <Modal
        open={isModalOpen}
        onCancel={closeUpgrade}
        footer={null}
        closeIcon={false}
        centered
        width={820}
        className="[&_.ant-modal-content]:rounded-2xl"
        maskClosable
        keyboard
      >
        {/* Header */}
        <div className="flex items-center justify-between p-2 pt-0">
          <h2 className="text-2xl font-bold md:text-3xl">
            Unlock More Impact!
          </h2>
          <button
            onClick={closeUpgrade}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        <p className="px-2 text-gray-500">
          Choose a plan that fits your organisation and scale your donor reach.
        </p>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 p-2 pt-6 md:grid-cols-2">
          {/* Focus Plan */}
          <div className="rounded-[22px] border bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100">
                <img src={star} alt="" className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">Focus Plan</h3>
            </div>

            <div className="mb-4">
              <div className="text-4xl font-extrabold">$20</div>
              <div className="text-gray-500">/month</div>
            </div>

            <ul className="mb-6 space-y-3 text-sm">
              {[
                "Everything in Basic, and more.",
                "Advanced donation filters.",
                "Monthly deposit reports.",
                "Real-time donation tracking.",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gray-300" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleSelectPlan("focus")}
              className="w-full rounded-full bg-purple-100 py-3 font-medium text-purple-700 hover:bg-purple-200"
            >
              Upgrade to Focus Plan
            </button>
          </div>

          {/* Freedom Plan */}
          <div className="rounded-[22px] bg-gradient-to-br from-purple-500 to-violet-600 p-1 shadow-lg">
            <div className="rounded-[20px] bg-gradient-to-br from-purple-500/20 to-violet-600/20 p-0.5">
              <div className="rounded-[18px] p-6 text-white">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100">
                    <img src={star} alt="" className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-semibold">Freedom Plan</h3>
                </div>

                <div className="mb-4">
                  <div className="text-4xl font-extrabold">$40</div>
                  <div className="text-white/80">/month</div>
                </div>

                <ul className="mb-6 space-y-3 text-sm">
                  {[
                    "Access to donation dashboard.",
                    "View donor analytics.",
                    "Priority support.",
                    "Real-time donation tracking.",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3">
                      <span className="mt-1 h-2 w-2 rounded-full bg-white/70" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handleSelectPlan("freedom")}
                  className="w-full rounded-full bg-white py-3 font-medium text-purple-700 hover:bg-gray-50"
                >
                  Upgrade to Freedom Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SubscriptionCard;
