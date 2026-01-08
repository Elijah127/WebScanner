
const STORAGE_KEY = "Wedding_Member";
const TOTAL_MEMBERS = 500;

export function generateMembers() {
    const stored = localStorage.getItem(STORAGE_KEY + "_001");
    if (stored) return true;

    for (let i = 1; i <= TOTAL_MEMBERS; i++) {
        const padded = String(i).padStart(3, "0");
        localStorage.setItem(`Wedding_Member_${padded}`, JSON.stringify({ status: false, time: null }));
    }
    return false;
}

// Run once on page load
document.addEventListener("DOMContentLoaded", () => {
    generateMembers();
});

export function getMembers() {
    const members = [];
    for (let i = 1; i <= 500; i++) {
        const padded = String(i).padStart(3, "0");
        const memberText = `Wedding_Member_${padded}`;
        const member = JSON.parse(localStorage.getItem(memberText));
        members.push({
            memberText: memberText,
            status: member.status,
            time: member.time
        })
    }

    return members;
}