# mst-devtools-example

This started out as a coding challenge but I became inspired to develop it further when I started reading about 
[MobX-State-Tree](https://github.com/mobxjs/mobx-state-tree) with [Redux middleware](https://github.com/mobxjs/mobx-state-tree/tree/master/packages/mst-middlewares).
Always a big fan of [Redux devtools](https://github.com/zalmoxisus/redux-devtools-extension), I stumbled upon a pattern that leveraged 
mobx's awesome object-oriented concept with the traditional redux pattern but without a lot of the boilerplate and let me continue
to use the dev tools I wanted to. 

Just for kicks, I also took the opportunity to further refine my code.

* Convert to Typescript
* Replace front end state hashing with [json-server](https://github.com/typicode/json-server) to persist the data
* Replace ad-hoc data entities with MobX-State-Tree models

I've found this pattern to be very useful and have begun implementing it in my professional work.
