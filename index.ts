import { interval, of } from 'rxjs'; 
import { map, toArray, scan, groupBy, mergeMap, concatMap } from 'rxjs/operators';

const source = interval(1000).pipe(
  map(nr => ({key: nr < 20 ? 'x' : 'y', value: nr})),
  groupBy(x => x.key),
  concatMap(group$ => group$.pipe(
    map(obj => ({key: group$.key, value: obj}))
  ))
  // scan((acc, curr) => acc + curr.value, 0)
);

source.subscribe(console.log);