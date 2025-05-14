function InputQuantityBatch({range, index, batch, setBatch}) {
    const handleStartChange = (e) => {
        const newStart = e.target.value;
        const digitsOnly = newStart.replace(/\D/g, "");
        const newRanges = [...batch.ranges];

        newRanges[index] = {...newRanges[index], start: digitsOnly};

        const quantity = Number(batch.quantity);

        // Підрахунок загального заповнення до поточного діапазону
        const totalBefore = newRanges.reduce((sum, r, i) => {
            if (i === index) return sum; // пропускаємо поточний
            const diff = Number(r.end) - Number(r.start) + 1;
            return sum + (isNaN(diff) || diff < 0 ? 0 : diff);
        }, 0);

        const remaining = quantity - totalBefore;

        if (/^\d{6}$/.test(digitsOnly) && remaining > 0) {
            newRanges[index].end = String(Number(digitsOnly) + remaining - 1);
        }

        setBatch({...batch, ranges: newRanges});
    };

    const handleEndChange = (e) => {
        const newEnd = e.target.value;
        const digitsOnly = newEnd.replace(/\D/g, "");
        const newRanges = [...batch.ranges];
        newRanges[index] = {...newRanges[index], end: digitsOnly};

        if (
            /^\d{6}$/.test(digitsOnly) &&
            /^\d{6}$/.test(newRanges[index].start)
        ) {
            const count = Number(digitsOnly) - Number(newRanges[index].start) + 1;

            // Підрахунок загальної кількості в усіх діапазонах
            const total = newRanges.reduce((sum, r) => {
                const diff = Number(r.end) - Number(r.start) + 1;
                return sum + (isNaN(diff) || diff < 0 ? 0 : diff);
            }, 0);

            const quantity = Number(batch.quantity);
            const remaining = quantity - total;

            const hasEmpty = newRanges.some(r => r.start === "" && r.end === "");

            if (count > 0 && remaining > 0 && !hasEmpty) {
                newRanges.push({start: "", end: ""});
            } else if (total > quantity) {
                alert("Кількість у діапазонах перевищує вказану.");
            }
        }
        if (!/^\d{6}$/.test(digitsOnly)) {
            if (newRanges.length > index + 1) {
                newRanges.splice(index + 1); // видаляє всі після index
                setBatch({...batch, ranges: newRanges});
                return; // важливо, щоб далі код не продовжувався
            }
        }

        setBatch({...batch, ranges: newRanges});
    };

    return (
        <>
            <div className="d-flex justify-content-center gap-4 mb-3">
                <div className="form-group text-center">
                    <label className="form-label d-block">Початок</label>
                    <div className="input-group">
                        <span className="input-group-text">DG</span>
                        <input
                            type="text"
                            className="form-control"
                            value={range.start}
                            onChange={handleStartChange}
                            disabled={Number(batch.quantity) <= 0}
                            inputMode="numeric"
                            pattern="\d{6}"
                            maxLength={6}
                            required

                        />
                    </div>
                </div>
                <div className="form-group text-center">
                    <label className="form-label d-block">Кінець</label>
                    <div className="input-group">
                        <span className="input-group-text">DG</span>
                        <input
                            type="text"
                            className="form-control"
                            disabled={Number(batch.quantity) <= 0 || !/^\d{6}$/.test(batch.ranges[index]?.start || "")}
                            value={range.end}
                            onChange={handleEndChange}
                            inputMode="numeric"
                            pattern="\d{6}"
                            maxLength={6}
                            max={6}
                            required
                        />
                    </div>
                </div>
            </div>
        </>

    );
}

export default InputQuantityBatch;