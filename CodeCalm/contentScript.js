function removeDifficultyAndSolvedCount() {
    const hostname = window.location.hostname;

    // Codeforces
    if (hostname.includes("codeforces.com")) {
        const problemRows = document.querySelectorAll("table.problems tbody tr");
        problemRows.forEach((row) => {
            if (row.className === "accepted-problem") return;

            const difficultyCell = row.querySelector(".ProblemRating");
            const solvedCount = row.querySelector('[title="Participants solved the problem"]');

            if (difficultyCell) {
                difficultyCell.parentNode.removeChild(difficultyCell);
            }
            if (solvedCount) {
                solvedCount.parentNode.removeChild(solvedCount);
            }
        });
    }

    // CodeChef
    if (hostname.includes("codechef.com")) {

        // Function to handle CodeChef Practice rows
        function handlePracticeRows() {
            const rows = document.querySelectorAll("table._tableContainer_1deep_300 tr");

            if (rows.length === 0) {
                return; // Exit if no rows found
            }

            rows.forEach((row) => {
                const solvedIcon = row.querySelector('i._solvedIcon_1deep_364');
                const statusIconCell = row.querySelector('td._statusIcon_1deep_361');

                if (solvedIcon) {
                    return;
                }

                if (statusIconCell) {
                    let cells = Array.from(row.querySelectorAll('td'));
                    let statusIndex = cells.indexOf(statusIconCell);

                    for (let i = statusIndex + 1; i < cells.length; i++) {
                        cells[i].style.width = '0'; // Set width to 0
                        cells[i].style.overflow = 'hidden'; // Hide overflow
                        cells[i].style.visibility = 'hidden'; // Hide visibility
                    }
                }
            });
        }

        // Function to handle CodeChef Contests rows
        function handleContestRows() {
            const cRows = document.querySelectorAll("table.dataTable tbody tr");

            if (cRows.length === 0) {
                return; // Exit if no rows found
            }

            cRows.forEach((row) => {
                const iconAttempt = row.querySelector('img.icon-attempt');
                const isUnsolved = !iconAttempt || iconAttempt.getAttribute('title') === 'unsolved';

                if (isUnsolved) {
                    const numCells = row.querySelectorAll(".num");
                    numCells.forEach(cell => {
                        cell.style.display = 'none';
                    });
                }
            });
        }

        // Initial check
        if (window.location.href.includes("/practice/")) {
            setTimeout(handlePracticeRows, 1000); // 1 second timeout
        } else {
            setTimeout(handleContestRows, 1000); // 1 second timeout
        }

        // Observe changes to the DOM
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    if (window.location.href.includes("/practice/")) {
                        handlePracticeRows();
                    } else {
                        handleContestRows();
                    }
                }
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }
}

removeDifficultyAndSolvedCount();
