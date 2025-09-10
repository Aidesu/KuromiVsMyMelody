import { useState } from "react";
import "./App.css";

export default function Game() {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares) {
        const nextHistory = [
            ...history.splice(0, currentMove + 1),
            nextSquares,
        ];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
        setXNext(!xNext);
    }

    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
        setXNext(nextMove % 2 === 0);
    }

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = "Aler au coup #" + move;
        } else {
            description = "revenir au debut";
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        );
    });

    return (
        <main>
            <section>
                <Board
                    xNext={xNext}
                    squares={currentSquares}
                    onPlay={handlePlay}
                />
            </section>
            <div>
                <ul>{moves}</ul>
            </div>
        </main>
    );
}

function Board({ xNext, squares, onPlay }) {
    function click(i) {
        if (squares[i] || whoWin(squares)) {
            return;
        }
        const nextSquares = squares.slice();
        xNext
            ? (nextSquares[i] =
                  "https://i.pinimg.com/originals/ab/fa/b8/abfab813a0ee7879ce701b83b9371cac.png")
            : (nextSquares[i] =
                  "https://i.pinimg.com/originals/25/65/45/256545d24813007fa2eb79e0dd60d56b.png");
        onPlay(nextSquares);
    }

    const winner = whoWin(squares);
    let status;
    if (winner) {
        if (
            winner ===
            "https://i.pinimg.com/originals/ab/fa/b8/abfab813a0ee7879ce701b83b9371cac.png"
        ) {
            status = "kuromi win !";
        } else {
            status = "My melody win !";
        }
    } else {
        status = "prochain tour : " + (xNext ? "Kuromi" : "My melody");
    }

    return (
        <>
            <div>
                <Square value={squares[0]} onSquareClick={() => click(0)} />
                <Square value={squares[1]} onSquareClick={() => click(1)} />
                <Square value={squares[2]} onSquareClick={() => click(2)} />
            </div>
            <div>
                <Square value={squares[3]} onSquareClick={() => click(3)} />
                <Square value={squares[4]} onSquareClick={() => click(4)} />
                <Square value={squares[5]} onSquareClick={() => click(5)} />
            </div>
            <div>
                <Square value={squares[6]} onSquareClick={() => click(6)} />
                <Square value={squares[7]} onSquareClick={() => click(7)} />
                <Square value={squares[8]} onSquareClick={() => click(8)} />
            </div>
            <h3>{status}</h3>
        </>
    );
}

function Square({ value, onSquareClick }) {
    // const [value, setValue] = useState(null);
    // function click() {
    //     setValue("F");
    // }

    return (
        <button className="square" onClick={onSquareClick}>
            <img src={value} alt="" />
        </button>
    );
}

function whoWin(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return null;
}
