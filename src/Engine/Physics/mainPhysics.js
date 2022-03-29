
export default function hitDetection(balloonX, balloonY, trees) {
    const cartBottomLeft = { x: balloonX - 30, y: balloonY };
    const cartBottomRight = { x: balloonX + 30, y: balloonY };
    const cartTopRight = { x: balloonX + 30, y: balloonY - 40 };

    for (const { x, h, r1, r2, r3, r4, r5 } of trees) {
        const treeBottomLeft = { x: x - 20, y: -h - 15 };
        const treeLeft = { x: x - 30, y: -h - 25 };
        const treeTopLeft = { x: x - 20, y: -h - 35 };
        const treeTop = { x: x, y: -h - 45 };
        const treeTopRight = { x: x + 20, y: -h - 35 };

        if (getDistance(cartBottomLeft, treeBottomLeft) < r1) return true;
        if (getDistance(cartBottomRight, treeBottomLeft) < r1) return true;
        if (getDistance(cartTopRight, treeBottomLeft) < r1) return true;

        if (getDistance(cartBottomLeft, treeLeft) < r2) return true;
        if (getDistance(cartBottomRight, treeLeft) < r2) return true;
        if (getDistance(cartTopRight, treeLeft) < r2) return true;

        if (getDistance(cartBottomLeft, treeTopLeft) < r3) return true;
        if (getDistance(cartBottomRight, treeTopLeft) < r3) return true;
        if (getDistance(cartTopRight, treeTopLeft) < r3) return true;

        if (getDistance(cartBottomLeft, treeTop) < r4) return true;
        if (getDistance(cartBottomRight, treeTop) < r4) return true;
        if (getDistance(cartTopRight, treeTop) < r4) return true;

        if (getDistance(cartBottomLeft, treeTopRight) < r5) return true;
        if (getDistance(cartBottomRight, treeTopRight) < r5) return true;
        if (getDistance(cartTopRight, treeTopRight) < r5) return true;
    }
}

export function getDistance(point1, point2) {
    return Math.sqrt((point2.x - point1.x) ** 2 + (point2.y - point1.y) ** 2);
}

  
Math.sinus = function (degree) {
    return Math.sin((degree / 180) * Math.PI);
};