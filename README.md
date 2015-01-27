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

- dev/ts/App.ts | Controller
- dev/ts/Model.ts| Model
- dev/ts/View.ts | View
- dev/less/style.less | style
- pub/index.html | html

###gulp compile
>**project directory**
>gulp

*macの場合は、sudoをつける*

## Sequence
サンプルにおけるリアクティブの流れです。

1. input.onkeyup->controller:showName(value)
2. controller->model:setName(value)
3. model->modelBase:setProperty("name", value)
4. modelBase->modelBase:lazyTrigger("change")
   以後16ミリ秒後までchangeイベントのリクエスト無視する
5. 16ミリ秒後イベント送出
6. modelBase->view:update()
   変更のあるmodelの値のみを書き換える

