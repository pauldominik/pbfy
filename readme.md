# pbfy

[See demo](https://debug1.pauldominik.com/pbfy/demo.html)

# usage

- requires jquery 1.7.2+
- initialize by:
```js
$('#someList').pbfy();
```
- config:
```js
{
    index: 1,
    accent: '#12a8df',
    tabColor: '#fff',
    textColor:'#000',
    dividerColor: 'whitesmoke'
}
```

# methods

- pb.hl(index: number) : highlight
- pb.i(): gets the index of active tab
- pb.f(): forward
- pb.b(): back
- pb.g(): gets active tabs html text

