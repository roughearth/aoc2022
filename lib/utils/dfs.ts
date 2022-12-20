
export type DFS<T> = {
  [Symbol.iterator]: () => Generator<T, void, unknown>,
  leafs: () => Generator<T, void, unknown>
};

export function dfsFrom<T>(
  startNode: T,
  edgeFn: (n: T) => T[] | undefined
): DFS<T> {
  function* nodes(): Generator<[T, number | undefined], void, unknown> {
    const stack: T[] = [startNode];
    const visitedNodes = new Set<T>();

    while (stack.length) {
      const next = stack.pop()!;

      if (!visitedNodes.has(next)) {
        visitedNodes.add(next);
        const edges = edgeFn(next);

        yield [next, edges?.length];

        if (edges) {
          for (const node of edges) {
            stack.push(node);
          }
        }
      }
    }
  }

  return {
    *[Symbol.iterator]() {
      for (const [node] of nodes()) {
        yield node;
      }
    },
    *leafs() {
      for (const [node, edgeCount] of nodes()) {
        if (edgeCount === 0) {
          yield node;
        }
      }
    }
  };
}