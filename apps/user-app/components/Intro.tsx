"use client";

import { content } from "@/lib";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import {
  Wallet,
  Banknote,
  ArrowDownCircle,
  Send,
  History,
} from "lucide-react";

export const Intro = () => {
  return (
    <div className="w-full h-[60vh] px-6 pt-20 md:pt-10 lg:pt-0">
      <TopBar />
      <One/>
      <Two/>
      <Three/>
      <Four/>
    </div>
  );
};


const TopBar = () => {
  const router = useRouter();
  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-md bg-background">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="text-xl ml-4 font-semibold">PayMents</div>
        <button
          onClick={() => router.push("/signin")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </div>
    </div>
  );
};

const One = () => {
  return(
  <div className="one flex flex-col mt-10 pl-5 md:flex-row gap-8 items-center justify-between max-w-7xl mx-auto md:mt-5">
        {/* Text Content */}
        <div className="flex-1">
          <div className="text-xl sm:text-2xl font-bold mb-4 sm:pl-10">
            💳 Payments App – Simplified Money Transfers
          </div>
          <p className="max-w-xl text-sm sm:text-lg flex justify-center sm:pl-10 text-accent-foreground">{content}</p>
        </div>

        {/* Image */}
        <div className="flex-1">
          <Image
            src="/payments.svg"
            alt="Payments"
            width={800}
            height={600}
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    );
}



const Two = () => {
  return (
    <div className="w-full px-6 py-12 max-w-7xl mx-auto flex flex-col gap-12">
      {/* Section: Dashboard */}
      <div className="flex flex-col gap-4">
        <h2 className="text-xl md:text-2xl font-semibold">🚀 Get Started</h2>
        <p className="text-sm md:text-xl text-accent-foreground ">
          After logging in or signing up, you will be redirected to your dashboard.
        </p>
        <div className="flex justify-center">
          <Image
          src="/board.png"
          alt="Dashboard"
          width={400}
          height={300}
          className="w-[800px] h-auto rounded-lg shadow-md "
        />
        </div>
      </div>

      {/* Section: Profile & Wallet Setup */}
      <div className="flex flex-col gap-4">
        <h3 className="text-xl md:text-2xl font-medium">🛠 Set Up Your Profile</h3>
        <p className="text-sm md:text-xl text-accent-foreground ">
          Navigate to the profile page to generate your Paytm ID and set your wallet PIN for secure transactions.
        </p>

        <div className="flex flex-col md:flex-row gap-4 md:justify-center pt-4">
          <Image
          src="/profile.png"
          alt="Profile"
          width={800}
          height={600}
          className="w-fit sm:w-1/2 h-auto rounded-lg shadow-md"
        />
        <Image
          src="/walletpin.png"
          alt="Wallet Pin"
          width={800}
          height={600}
          className="w-fit sm:w-1/3 h-auto rounded-lg shadow-md"
        />
        </div>
      </div>
    </div>
  );
};

const Three = () => {
  return (
    <div className="my-10 px-6 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        🔧 Explore App Features
      </h2>
      <p className="text-base sm:text-lg text-center mb-10">
        Navigate through different features. You can add money to your wallet in the deposit section,
        withdraw money, transfer funds to other users, check your transaction history, and more.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
        <Feature icon={<Banknote className="text-blue-600 w-8 h-8 mx-auto mb-2" />} title="Add Funds" description="Add money from your bank to your wallet (mocked)." />
        <Feature icon={<ArrowDownCircle className="text-green-600 w-8 h-8 mx-auto mb-2" />} title="Withdraw" description="Withdraw wallet balance to your bank (mocked)." />
        <Feature icon={<Send className="text-purple-600 w-8 h-8 mx-auto mb-2" />} title="P2P Transfers" description="Send money to other users using Paytm ID." />
        <Feature icon={<History className="text-orange-600 w-8 h-8 mx-auto mb-2" />} title="Transaction History" description="View all your transfers, deposits, and withdrawals." />
        <Feature icon={<Wallet className="text-pink-600 w-8 h-8 mx-auto mb-2" />} title="Wallet Overview" description="Check your current wallet balance anytime." />
      </div>
    </div>
  );
};

const Four = () => {
  return (
    <div className="my-10 px-6 max-w-7xl mx-auto text-center py-10">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6">
        📬 Contact Information
      </h2>
      <p className="text-base sm:text-lg mb-10">
        Feel free to reach out for feedback, collaboration, or questions.
      </p>

      <div className="text-sm sm:text-base space-y-2">
        <p>
          📧 Email:{" "}
          <a
            href="mailto:abhimukesh284@gmail.com"
            className="text-blue-600 underline hover:text-blue-800"
          >
            abhimukesh284@gmail.com
          </a>
        </p>
        <p>
          🐙 GitHub:{" "}
          <a
            href="https://github.com/MukeshAbhi"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            github.com/MukeshAbhi
          </a>
        </p>
        <p>
          🌐 Portfolio:{" "}
          <a
            href="https://portfolio.mukeshtech.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline hover:text-blue-800"
          >
            portfolio.mukeshtech.site
          </a>
        </p>
      </div>

      <div className="mt-12 border-t pt-6">
        <p className="text-muted-foreground text-sm">
          Done & Maintained by <span className="font-semibold text-accent-foreground">Mukesh Papanna</span>
        </p>
      </div>
    </div>
  );
};


const Feature = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <div className="bg-bg-muted shadow-md rounded-lg p-6 hover:shadow-lg transition duration-300">
    {icon}
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
);
