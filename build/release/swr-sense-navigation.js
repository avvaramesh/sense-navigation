/*!

* sense-navigation - Sense Sheet Navigation + Actions visualization extension for Qlik Sense.
* --
* @version v1.0.0-rc1-05
* @link https://github.com/stefanwalther/sense-navigation
* @author Stefan Walther
* @license MIT
*/

define(["./lib/external/lodash/lodash.min","qlik","angular","./lib/external/sense-extension-utils/general-utils","./properties","text!./template.ng.html","css!./lib/css/main.min.css","css!./lib/external/font-awesome/css/font-awesome.min.css"],function(__,qlik,angular,generalUtils,props,ngTemplate){"use strict";function splitToStringNum(str,sep){let a=str.split(sep);for(let i=0;i<a.length;i++)isNaN(a[i])||(a[i]=Number(a[i]));return a}return{definition:props,support:{export:!1,exportData:!1,snapshot:!1},initialProperties:{},snapshot:{canTakeSnapshot:!1},template:ngTemplate,controller:["$scope","$element",function($scope,$element){$scope.doNavigate=function(){switch($scope.layout.props.navigationAction){case"gotoSheet":$scope.gotoSheet($scope.layout.props.selectedSheet);break;case"gotoSheetById":$scope.gotoSheet($scope.layout.props.sheetId);break;case"gotoStory":$scope.gotoStory($scope.layout.props.selectedStory);break;case"nextSheet":$scope.nextSheet();break;case"openWebsite":const url=$scope.layout.props.websiteUrl,same=$scope.layout.props.sameWindow;__.isEmpty(url)||window.open((url=url).startsWith("http://")||url.startsWith("https://")||url.startsWith("mailto://")?url:"http://"+url,same?"_self":"");break;case"prevSheet":$scope.prevSheet();break;case"switchToEdit":qlik.navigation.setMode(qlik.navigation.EDIT).success}var url},$scope.isEditMode=function(){return qlik.navigation.getMode()===qlik.navigation.EDIT},$scope.doAction=function(){const app=qlik.currApp();let fld,val,actionType,softLock,bookmark,variable;if($scope.layout.props&&$scope.layout.props.actionItems)for(let i=0;i<$scope.layout.props.actionItems.length;i++)switch(actionType=$scope.layout.props.actionItems[i].actionType,fld=__.isEmpty($scope.layout.props.actionItems[i].selectedField)?$scope.layout.props.actionItems[i].field:$scope.layout.props.actionItems[i].selectedField,val=$scope.layout.props.actionItems[i].value,softLock=$scope.layout.props.actionItems[i].softLock,bookmark=$scope.layout.props.actionItems[i].selectedBookmark,variable=$scope.layout.props.actionItems[i].variable,actionType){case"applyBookmark":__.isEmpty(bookmark)||app.bookmark.apply(bookmark);break;case"back":app.back().catch(function(err){});break;case"clearAll":app.clearAll();break;case"clearField":__.isEmpty(fld)||app.field(fld).clear();break;case"clearOther":app.field(fld).clearOther(softLock);break;case"forward":app.forward().catch(function(err){});break;case"lockAll":app.lockAll();break;case"lockField":__.isEmpty(fld)||app.field(fld).lock();break;case"replaceBookmark":__.isEmpty(bookmark)||app.bookmark.apply(bookmark);break;case"selectAll":__.isEmpty(fld)||app.field(fld).selectAll(softLock);break;case"selectAlternative":__.isEmpty(fld)||app.field(fld).selectAlternative(softLock);break;case"selectAndLockField":__.isEmpty(fld)||__.isEmpty(val)||(app.field(fld).selectMatch(val,!0),app.field(fld).lock());break;case"selectExcluded":__.isEmpty(fld)||app.field(fld).selectExcluded(softLock);break;case"selectField":__.isEmpty(fld)||__.isEmpty(val)||app.field(fld).selectMatch(val,!1);break;case"selectValues":if(!__.isEmpty(fld)&&!__.isEmpty(val)){let vals=splitToStringNum(val,";");app.field(fld).selectValues(vals,!1)}break;case"selectPossible":__.isEmpty(fld)||app.field(fld).selectPossible(softLock);break;case"setVariable":__.isEmpty(variable)||$scope.setVariableContent(variable,val);break;case"toggleSelect":__.isEmpty(fld)||__.isEmpty(val)||app.field(fld).toggleSelect(val,softLock);break;case"unlockAll":app.unlockAll();break;case"unlockAllAndClearAll":$scope.unlockAllAndClearAll();break;case"unlockField":__.isEmpty(fld)||app.field(fld).unlock()}},$scope.go=function(){$scope.isEditMode()||($scope.doAction(),$scope.doNavigate())},$scope.nextSheet=function(){$scope.checkQlikNavigation()&&qlik.navigation.nextSheet()},$scope.prevSheet=function(){$scope.checkQlikNavigation()&&qlik.navigation.prevSheet()},$scope.gotoSheet=function(sheetId){$scope.checkQlikNavigation()&&!__.isEmpty(sheetId)&&qlik.navigation.gotoSheet(sheetId).success},$scope.gotoStory=function(storyId){$scope.checkQlikNavigation()&&!__.isEmpty(storyId)&&qlik.navigation.gotoStory(storyId)},$scope.setVariableContent=function(variableName,variableValue){qlik.currApp().variable.setContent(variableName,variableValue).then(function(){angular.noop()}).catch(function(err){})},$scope.checkQlikNavigation=function(){return!!qlik.navigation},$scope.unlockAllAndClearAll=function(){const app=qlik.currApp();app.unlockAll(),app.clearAll()}}]}});