document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk memformat angka sebagai mata uang Rupiah
    function formatRupiah(angka) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(angka);
    }
    // Tambahkan ini di bagian atas file, setelah DOMContentLoaded event listener

// Fungsi untuk menampilkan halaman yang dipilih
function showPage(pageId) {
    document.querySelectorAll('section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(pageId).classList.remove('hidden');
}

// Event listener untuk menu navigasi
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const pageId = e.target.getAttribute('href').substring(1);
        showPage(pageId);
    });
});

// Data transaksi (contoh)
const transactions = [
    { date: '2023-05-15', description: 'Setoran Tunai', type: 'deposit', amount: 5000000, balance: 15000000, status: 'Berhasil' },
    { date: '2023-05-14', description: 'Pembayaran Tagihan', type: 'withdrawal', amount: -1500000, balance: 10000000, status: 'Berhasil' },
    { date: '2023-05-13', description: 'Transfer Masuk', type: 'transfer', amount: 3000000, balance: 11500000, status: 'Berhasil' },
    // Tambahkan lebih banyak data transaksi di sini
];

let currentPage = 1;
const itemsPerPage = 10;

// Fungsi untuk menampilkan transaksi
function displayTransactions(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const tableBody = document.querySelector('#transactionsTable tbody');
    tableBody.innerHTML = '';

    for (let i = startIndex; i < endIndex && i < transactions.length; i++) {
        const transaction = transactions[i];
        const row = `
            <tr>
                <td>${transaction.date}</td>
                <td>${transaction.description}</td>
                <td>${transaction.type}</td>
                <td>${formatRupiah(transaction.amount)}</td>
                <td>${formatRupiah(transaction.balance)}</td>
                <td>${transaction.status}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    }

    document.getElementById('currentPage').textContent = `Halaman ${page}`;
    document.getElementById('prevPage').disabled = page === 1;
    document.getElementById('nextPage').disabled = endIndex >= transactions.length;
}

// Event listener untuk pagination
document.getElementById('prevPage').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayTransactions(currentPage);
    }
});

document.getElementById('nextPage').addEventListener('click', () => {
    if (currentPage < Math.ceil(transactions.length / itemsPerPage)) {
        currentPage++;
        displayTransactions(currentPage);
    }
});

// Event listener untuk filter transaksi
document.getElementById('filterTransactions').addEventListener('click', () => {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const transactionType = document.getElementById('transactionType').value;

    const filteredTransactions = transactions.filter(transaction => {
        const dateInRange = (!startDate || transaction.date >= startDate) && (!endDate || transaction.date <= endDate);
        const typeMatch = transactionType === 'all' || transaction.type === transactionType;
        return dateInRange && typeMatch;
    });

    // Tampilkan transaksi yang telah difilter
    // (Anda mungkin perlu memodifikasi fungsi displayTransactions untuk menerima array transaksi sebagai parameter)
});

// Tampilkan transaksi saat halaman dimuat
displayTransactions(currentPage);

    // Mengisi data saldo, pendapatan, dan pengeluaran
    document.getElementById('totalBalance').textContent = formatRupiah(50000000000);
    document.getElementById('totalIncome').textContent = formatRupiah(7500000000);
    document.getElementById('totalExpense').textContent = formatRupiah(2500000000);

    // Membuat grafik keuangan (diagram batang)
    const ctx = document.getElementById('financeChart').getContext('2d');
    const financeChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
            datasets: [{
                label: 'Pendapatan',
                data: [5000, 5900, 8000, 8100, 5600, 5500, 4000, 6500, 5900, 8000, 8100, 7500],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }, {
                label: 'Pengeluaran',
                data: [3000, 3900, 4000, 4100, 3600, 3500, 2000, 3500, 3900, 4000, 4100, 2500],
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: false
                }
            },
            scales: {
                x: {
                    stacked: false,
                },
                y: {
                    stacked: false,
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'Rp ' + value / 1000 + 'K';
                        }
                    }
                }
            }
        }
    });

    // Data transaksi terbaru
    const recentTransactions = [
        { date: '2023-05-15', description: 'Setoran Tunai', amount: 5000000, status: 'Berhasil' },
        { date: '2023-05-14', description: 'Pembayaran Tagihan', amount: -1500000, status: 'Berhasil' },
        { date: '2023-05-13', description: 'Transfer Masuk', amount: 3000000, status: 'Berhasil' },
        { date: '2023-05-12', description: 'Penarikan ATM', amount: -1000000, status: 'Berhasil' },
        { date: '2023-05-11', description: 'Pembayaran Gaji', amount: 10000000, status: 'Diproses' }
    ];

    // Mengisi tabel transaksi terbaru
    const recentTransactionsTable = document.getElementById('recentTransactionsTable').getElementsByTagName('tbody')[0];
    recentTransactions.forEach(transaction => {
        let row = recentTransactionsTable.insertRow();
        row.insertCell(0).textContent = transaction.date;
        row.insertCell(1).textContent = transaction.description;
        row.insertCell(2).textContent = formatRupiah(transaction.amount);
        let statusCell = row.insertCell(3);
        statusCell.textContent = transaction.status;
        statusCell.className = transaction.status.toLowerCase();
    });
});