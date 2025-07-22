// src/pages/Accounts.jsx
import { useState } from "react";
import AccountList from "../components/AccountList";
import AccountForm from "../components/AccountForm";
import DashboardSummary from "../components/DashboardSummary";

export default function AccountsPage() {
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (account) => setSelectedAccount(account);
  const handleSuccess = () => {
    setSelectedAccount(null);
    setRefresh(prev => !prev);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <DashboardSummary key={refresh} />
      <AccountForm selectedAccount={selectedAccount} onSuccess={handleSuccess} />
      <AccountList key={refresh} onEdit={handleEdit} />
    </div>
  );
}
