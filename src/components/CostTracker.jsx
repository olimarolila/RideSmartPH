import '../css/CostTracker.css';
import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
  query,
  orderBy,
  where,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CostTracker() {
  const [item, setItem] = useState("");
  const [price, setPrice] = useState("");
  const [userId, setUserId] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [groupedView, setGroupedView] = useState(false); // NEW

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserId(user.uid);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (userId) fetchExpenses();
  }, [userId]);

  const fetchExpenses = async () => {
    if (!userId) return;

    try {
      const expenseRef = collection(db, "costTracker", userId, "expenses");
      let q = query(expenseRef, orderBy("timestamp", "desc"));

      if (startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        q = query(
          expenseRef,
          where("timestamp", ">=", start),
          where("timestamp", "<=", end),
          orderBy("timestamp", "desc")
        );
      }

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setExpenses(data);

      const totalAmount = data.reduce((sum, e) => sum + e.price, 0);
      setTotal(totalAmount);
    } catch (err) {
      console.error("Error fetching expenses:", err);
      toast.error("Failed to load expenses.");
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    if (!item.trim() || !price.trim()) {
      toast.warning("Please enter both item and price.");
      return;
    }

    const parsedPrice = parseFloat(price.replace(/[₱,]/g, ""));
    if (isNaN(parsedPrice)) {
      toast.error("Invalid price format.");
      return;
    }

    try {
      if (editingId) {
        const ref = doc(db, "costTracker", userId, "expenses", editingId);
        await updateDoc(ref, {
          item,
          price: parsedPrice
        });
        toast.success("Expense updated! ✅");
        setEditingId(null);
      } else {
        await addDoc(collection(db, "costTracker", userId, "expenses"), {
          item,
          price: parsedPrice,
          timestamp: serverTimestamp(),
        });
        toast.success("Expense saved! ✅");
      }

      setItem("");
      setPrice("");
      fetchExpenses();
    } catch (err) {
      console.error("Failed to save/update:", err);
      toast.error("Failed to save expense.");
    }
  };

  const handleDelete = async (expenseId) => {
    try {
      await deleteDoc(doc(db, "costTracker", userId, "expenses", expenseId));
      toast.info("Expense deleted.");
      fetchExpenses();
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Failed to delete.");
    }
  };

  const handleEditClick = (exp) => {
    setItem(exp.item);
    setPrice(exp.price.toString());
    setEditingId(exp.id);
  };

  const cancelEdit = () => {
    setItem("");
    setPrice("");
    setEditingId(null);
  };

  const handleResetFilter = () => {
    setStartDate("");
    setEndDate("");
    setTimeout(() => {
      fetchExpenses();
    }, 0);
  };

  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "Unknown";
    return timestamp.toDate().toLocaleString();
  };

  // Group expenses by month (NEW)
  const groupExpensesByMonth = (expenses) => {
    const groups = {};

    expenses.forEach((exp) => {
      const date = exp.timestamp?.toDate?.();
      if (!date) return;

      const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      if (!groups[monthYear]) {
        groups[monthYear] = { total: 0, items: [] };
      }

      groups[monthYear].items.push(exp);
      groups[monthYear].total += exp.price;
    });

    return groups;
  };

  return (
    <div className="cost-tracker-container">
      <ToastContainer />
      <h2 className="cost-tracker-title">💸 Cost Tracker</h2>
      <p className="cost-tracker-subtitle">Track your motorcycle expenses</p>

      <div className="cost-row">
        <form onSubmit={handleAddExpense} className="cost-form">
          <label>
            Item Name:
            <input
              type="text"
              value={item}
              onChange={(e) => setItem(e.target.value)}
              placeholder="e.g. Tires"
            />
          </label>
          <label>
            Price (₱):
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 500"
            />
          </label>
          <button type="submit" className="save-expense-button">
            {editingId ? "✅ Update Expense" : "➕ Add Expense"}
          </button>
          {editingId && (
            <button type="button" onClick={cancelEdit} className="reset-expense-button">
              ❌ Cancel Edit
            </button>
          )}
        </form>

        <div className="filter-form">
          <label>
            Filter From:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            To:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <button type="button" onClick={fetchExpenses} className="save-expense-button">
            📅 Filter
          </button>
          <button type="button" onClick={handleResetFilter} className="reset-expense-button">
            🔄 Reset
          </button>
          <button
            type="button"
            onClick={() => setGroupedView(!groupedView)}
            className="reset-expense-button"
          >
            {groupedView ? "🔄 Switch to List View" : "📊 Group by Month"}
          </button>
        </div>
      </div>

      <div className="expense-list">
        {expenses.length === 0 ? (
          <p>No expenses recorded yet.</p>
        ) : groupedView ? (
          <>
            {Object.entries(groupExpensesByMonth(expenses)).map(([month, data]) => (
              <div key={month} className="expense-card">
                <h3 style={{ marginBottom: "0.5rem" }}>{month} – ₱{data.total.toFixed(2)}</h3>
                {data.items.map((exp) => (
                  <div key={exp.id} style={{ borderTop: "1px solid #ccc", marginTop: "0.5rem", paddingTop: "0.5rem" }}>
                    <p><strong>Item:</strong> {exp.item}</p>
                    <p><strong>Price:</strong> ₱{exp.price.toFixed(2)}</p>
                    <p><strong>Date:</strong> {formatDate(exp.timestamp)}</p>
                    <button onClick={() => handleEditClick(exp)} className="expense-button edit-expense-button">✏️ Edit</button>
                    <button onClick={() => handleDelete(exp.id)} className="expense-button delete-expense-button">🗑️ Delete</button>
                  </div>
                ))}
              </div>
            ))}
          </>
        ) : (
          <>
            <h3 style={{ color: "#2c3e50", marginTop: "1rem" }}>
              Total: ₱{total.toFixed(2)}
            </h3>
            {expenses.map((exp) => (
              <div key={exp.id} className="expense-card">
                <p><strong>Item:</strong> {exp.item}</p>
                <p><strong>Price:</strong> ₱{exp.price.toFixed(2)}</p>
                <p><strong>Date:</strong> {formatDate(exp.timestamp)}</p>
                <button onClick={() => handleEditClick(exp)} className="expense-button edit-expense-button">✏️ Edit</button>
                <button onClick={() => handleDelete(exp.id)} className="expense-button delete-expense-button">🗑️ Delete</button>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default CostTracker;