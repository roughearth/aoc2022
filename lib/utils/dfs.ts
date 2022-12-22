
export type DFS<T> = {
  [Symbol.iterator]: () => Generator<T, void, unknown>,
  leafs: () => Generator<T, void, unknown>
};


const fooGenerator: () => Generator<number, void, undefined> = function* () {
  for (let i = 1; i <= 10; i++) {
    yield i;
  }
}

const fooIterator: () => Iterator<number> = function () {
  let i = 1;
  return {
    next() {
      return {
        value: i++,
        done: i <= 10
      };
    }
  };
}

const fooIterable: () => Iterable<number> = function () {
  let i = 1;
  return {
    [Symbol.iterator]() {
      return {
        next() {
          return {
            value: i++,
            done: i <= 10
          };
        }
      };
    }
  };
}

const fooGeneratorArray: () => number[] = function () {
  return Array.from(fooGenerator());
}

const fooIterableArray: () => number[] = function () {
  return Array.from(fooIterable());
}

export function Stack<T>(start?: T) {
  type Top = [T, Top] | undefined;
  let top: Top;

  const _this = {
    push(item: T) {
      top = [item, top];
    },
    pop() {
      let item;
      if (top) {
        [item, top] = top;
      }
      return item;
    },
    hasMore() {
      return Boolean(top);
    }
  };

  if (start) {
    _this.push(start);
  }

  return _this;
}
export type Stack<T> = ReturnType<typeof Stack<T>>;

export function dfsFrom<T>(
  startNode: T,
  edgeFn: (n: T) => T[] | undefined,
  {
    setConstructor = () => (new Set<T>())
  }: {
    setConstructor?: () => {
      has: (i: T) => boolean,
      add: (i: T) => void
    }
  } = {}
): DFS<T> {
  function* nodes(): Generator<[T, number | undefined], void, unknown> {
    const stack: Stack<T> = Stack(startNode);
    const visitedNodes = setConstructor();

    while (stack.hasMore()) {
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