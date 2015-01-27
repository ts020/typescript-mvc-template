# reactive_template
ライブラリ外部ライブラリに依存しない
TypeScriptでReactiveなテンプレートです。


## Install
*なお、macの場合は、gulp-notifierでpermission Errorが起こるので*
*package Installの際には sudoをつけてください。*

### Global Library Install
>**typeScript install**
>npm i typescript -g

>**gulp install**
>npm i gulp -g

>**less install**
>npm i less -g

### Package Install
>**module install**
>npm i


##Edit
**編集するのは主に下記のファイルになります。**
file     | role
-------- | ---
dev/ts/App.ts | Controller 
dev/ts/Model.ts| Model
dev/ts/View.ts | View
dev/less/style.less | style
pub/index.html | html

###gulp compile
>**project directory**
>gulp

*macの場合は、sudoをつける*

## Sequence
サンプルにおけるリアクティブの流れです。
```sequence
input.onkeyup->controller:showName(value)
controller->model:setName(value)
model->modelBase:setProperty("name", value)
modelBase->modelBase:lazyTrigger("change")
Note right of modelBase: 以後16ミリ秒後までchangeイベントのリクエスト無視する
modelBase->view:update()
Note right of view: 変更のあるmodelの値のみを書き換える
```
