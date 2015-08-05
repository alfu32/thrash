/*
 * is an associative array of lists ::
 * {'list0':[0,1,2,3,4,5],'puppies':['fuzzy','speedy','daisy'],'':[]}
 * */
var ArrayCatalog=(function(){
	var CLASS=function ArrayCatalog(){
		Base.call(this,['ArrayCatalog']);
		var _THIS=this
		var cat={}
		/** abstract method */
		this.afterAdd=function(catalogue,sectionName,index){}
		/** abstract method */
		this.afterRemove=function(catalogue,sectionName,value){}
		/** getter */
		this.cat=function(){
			return cat;
		}
		/** operator append */
		this.add=function(sectionName,value){
			if(cat[sectionName]==undefined){
				cat[sectionName]=[];
			}
			var index=cat[sectionName].length;
			cat[sectionName][index]=value;
			_THIS.afterAdd(cat,sectionName,index);
		}
		/** operator remove */
		this.remove=function(sectionName,index){
			if(cat[sectionName]==undefined){
				cat[sectionName]=[];
			}
			var val=cat[sectionName][cat[sectionName].length];
			cat[sectionName].length--;
			_THIS.afterRemove(cat,sectionName,val);
		}
		/** get section */
		this.get=function(sectionName){
			return cat[sectionName]
		}
		
		this.has=function(sectionName,value){
			if(value==undefined){
				return sectionName in cat;
			}else{
				if(sectionName in cat){
					for(var i=0;i<cat[sectionName].length;i++){
						if(cat[sectionName][i]==value)return true;
					}
					return false;
				}else{
					return false;
				}
			}
		}
	}
	return CLASS;
})();
/*
 * is an associative array of associative array (you can call it associative matrix) ::
 * */
var DictCatalog=(function(){
	var CLASS=function DictCatalog(){
		Base.call(this,['DictCatalog']);
		var cat={}
		this.cat=function(){
			return cat;
		}
		this.add=function(sectionName,value){
			if(cat[sectionName]==undefined){
				cat[sectionName]={};
			}
			cat[sectionName][value]=value
		}
		this.get=function(sectionName){
			return cat[sectionName]
		}
		
		this.has=function(sectionName,value){
			if(value==undefined){
				return sectionName in cat;
			}else{
				if(sectionName in cat){
					for(var i in cat[sectionName]){
						if(cat[sectionName][i]==value)return true;
					}
					return false;
				}else{
					return false;
				}
			}
		}
	}
	return CLASS;
})();
/**
EXAMPLE :::
* {'ingredients':{
      'frogs':new Q(12,Q.PIECE)
      ,'cricketEyes':new Q(5,Q.PIECE)
      ,'sparrowNests':new Q(1,Q.PIECE)
      ,'spidersWeb':new Q(5,Q.OUNCE)
      ,'maidensTears':new Q(3,Q.PIECE)
    }
    ,'tools':{
      'cauldron':"1,big"
      ,'chronometer':'1'
      }
    ,'additional materials':{
        'pinewood':'5,big pieces'
      }
    ,'catalysts':{
        'books':"gormsBook"
        ,'nazgulShadow':"1,pass"
      }
    ,'steps':{
         '0':'fill the cauldron with water and bring to boiling point'
         ,'1':'mark time0'
         ,'2':'4 minutes after time 0 throw cricket eyes, sparrow nests and spiders-webs into the boiling water'
         ,'3':'read out loud the curse WZ.19.a at page 1823 from Gorm's book'
         ,'4':'as the nazgul arrives let his shadow pass one time over the boiling cauldron and while stirring throw a stone at it to chase it away'
         ,'5':'while chanting "oum oum" throw in the rest of ingredients apart from the maidens-tears'
         ,'6':'continue for another 5 minutes then take the cauldron away from the fire'
         ,'7':'the next full moon put in the maidens-tears'
      }
    ,'usage':{
    	'0':'smear the ointment onto the top of your head'
        '1':'may interact with soap or shampoo, so do not wash your head one month prior and after usage'
    }
    ,'contraindications':{
       '0':'do not use while under antibiotics'
    }
   }
*/