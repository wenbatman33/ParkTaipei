/*****
 * Copyright © FASTBOOKING  1999-2007
 * 20/02/2008
 *
 * Please do NOT modify this file
 * Please do NOT use the final IP adress for Fastbooking links:
 *   IP address may be changed at any time
 *
*/

var FBRESA = "http://www.fastbooking.co.uk/DIRECTORY/";
var FB_nb_day_delay = 7;





// following code is used to optimize booking access and a better client experience
var FB_book_image = new Image();
FB_book_image.src = FBRESA + "trans.gif";

// Form: show arrival date
// this function to replace the traditional start function
// in this case no update is required every year.
function start() {
	var nbm = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
		
	build_year_select();

	MD = new Date();
		
	nday = MD.getDate();
	aday = MD.getDay();
	amois = MD.getMonth();
	ayear = takeYear(MD);
	cur_year = ayear;
			
	nday += FB_nb_day_delay;

	if(nday > nbm[amois])
	{   		
		nday -= nbm[amois];
		amois++;
		if(amois > 11) { 
			ayear++;
			amois = 0;
		} 
	}
		
	indexDay = nday - 1;
	indexMois = amois;
	indexYear = ayear - cur_year;
		
	if(indexDay < 0 || indexDay > 30)
		indexDay = 0;
	if(indexMois < 0 || indexMois > 11)
		indexMois = 0;
	if(indexYear < 0 || indexYear > 1)
		indexDay = 0;

	document.idForm.fromday.selectedIndex = indexDay;
	document.idForm.frommonth.selectedIndex = indexMois;
	document.idForm.fromyear.selectedIndex = indexYear;

	update_departure();
}

// standard booking function
function hhotelPTC(cname, lg, codeprice, codetrack, cluster)
{
	hhotelResa(cname, lg, codeprice, "", "", codetrack, cluster, "", "")
}

// standard promotion function
function hhotelPromo(cname, lg, theme)
{
	hhotelResa(cname, lg, "DYNPROMO", "", "", "", "", theme, "")
}

// reservation promotion function: To show one promotion
function hhotelOnePromo(cname, lg, codeprice, codetrack, cluster)
{
	hhotelResa(cname, lg, codeprice, "", "", codetrack, cluster, "", "style=DIRECTPROMO")
}

// reservation page WITHOUT the individual access
function hhotelNegociated(cname, lg, codeprice, codetrack, cluster)
{
	hhotelResa(cname, lg, codeprice, "", "", codetrack, cluster, "", "negociated=1");
}

// Main direct reservation function
function hhotelResaDirect(cname, lg, codeprice, firstroom, codetrack, firstdate)
{
	hhotelResa(cname, lg, codeprice, firstroom, firstdate, codetrack, "", "", "style=DIRECT");
}

// standard search availabilities in a group
function hhotelSearchGroup(cluster, lg, price, nights, title)
{
	hhotelSearch(cluster, lg, price, nights, title, "", "");
}

// standard search availabilities in a group for a partner
function hhotelSearchPartner(cluster, lg, price, codetrack, title)
{
	if (codetrack != "") args = "&from="+codetrack;
	else	args = "";
    hhotelSearch(cluster, lg, price, "", title, "", args);
}

// search by giving the initial date
function hhotelSearchPriceDate(cluster, price, nights, title, firstdate)
{
	// firstdate : format "YYMMDD"
	var args="";
	if (firstdate != "") args = "FirstDate="+firstdate;
	hhotelSearch(cluster, "", price, nights, title, "", args);
}

function hhotelSearchPriceDateTrack(cluster, lg, price, codetrack, nights, title, firstdate)
{
 var args="";
 if (codetrack != "") args = "from="+codetrack;
 if (firstdate != "") args += "&FirstDate="+firstdate;
 hhotelSearch(cluster, lg, price, nights, title, "", args);
}

// search availabilities for selected promotions
function hhotelSearchPromo(cluster, lg, theme)
{
	hhotelSearch(cluster, lg, "", "", "", theme, "");
}

// search availabilities with Extra Field
function hhotelSearchExtra(cluster, lg, price, codetrack, extratitle, extraval, extrashow)
{
	var args = "Extrafield=" + escape(extratitle) + ";" + extraval + ";" + extrashow;
	if (codetrack != "") args += "&from="+codetrack;
	hhotelSearch(cluster, lg, price, "", "", "", args);
}

// go to the cancel reservation page
function hhotelcancel(cname,lg)
{
	var waction = FBRESA + "cancel.phtml?state=77&Hotelnames="+cname;
	if (lg != "") waction += "&langue="+lg;
	window.open(waction,"reservation","toolbar=no,width=400,height=350,menubar=no,scrollbars=yes,resizable=yes,alwaysRaised=yes");
}

// go to the extract reservation page
function hhotelExtract(cname, lg)
{   
	var waction = FBRESA + "getresa.phtml?Hotelnames="+cname+"&langue="+lg;
	window.open(waction, 'getresa', 'toolbar=no,width=700,height=300,menubar=no,scrollbars=yes,resizable=yes,alwaysRaised=yes');
   return false;
}

// check interface
function hhotelcheckrates(cname, lg)
{
	var waction = FBRESA + "crs.phtml?clusterName="+cname;
	if (lg != "") waction += "&langue="+lg;
	waction += "&checkPromo=1";
	window.open(waction,"search","toolbar=no,width=800,height=550,menubar=no,scrollbars=yes,resizable=yes,alwaysRaised=yes");
}

// Fidelity program
var FB_code_interface = "";
var FB_profil = "";
function hhotelProfil(code_interface, profil)
{
	FB_code_interface = code_interface;
	FB_profil = profil;
}

// Main standard reservation function
function hhotelResa(cname, lg, codeprice, firstroom, firstdate, codetrack, cluster, theme, args)
{
	var waction = FBRESA+"preresa.phtml?Hotelnames="+cname;
	if (lg != "") waction += "&langue="+lg;
	if (firstroom != "") {
		waction += "&FirstRoomName="+firstroom;
		if (codeprice == "")
			codeprice = "DIRECT";
		}
	if (firstdate != "") {
		waction += "&FirstDate="+firstdate;
		if (codeprice == "")
			codeprice = "DIRECT";
		}
	if (codeprice != "") waction += "&FSTBKNGCode="+codeprice;
	if (codetrack != "") waction += "&FSTBKNGTrackLink="+codetrack;
	if (cluster != "") waction += "&clustername="+cluster;
	if (theme != "") waction += "&theme="+theme;
	if (args != "" && (args.indexOf("=")!= -1) ) waction += "&"+args;
	if (FB_profil != "") {
		waction += "&code="+FB_code_interface;
		waction += "&profil="+FB_profil;
	}
	waction += "&HTTP_REFERER="+escape(document.location.href);
	window.open(waction,"reservation","toolbar=no,width=400,height=350,menubar=no,scrollbars=yes,resizable=yes,alwaysRaised=yes");
}


// Main Search function
function hhotelSearch(cluster, lg, price, nights, title, theme, args)
{
	var waction = FBRESA + "crs.phtml?clusterName="+cluster;
	if (lg != "") waction += "&langue="+lg;
	if (price != "") waction += "&FSTBKNGCode="+price;
	if (nights != "") waction += "&nights="+nights;
	if (title != "") waction += "&title="+escape(title);
	if (theme != "") waction += "&theme="+theme;
	if (args != "" && (args.indexOf("=")!= -1) ) waction += "&"+args;
	if (FB_profil != "") {
		waction += "&code="+FB_code_interface;
		waction += "&profil="+FB_profil;
	}
	window.open(waction,"search","toolbar=no,width=800,height=550,menubar=no,scrollbars=yes,resizable=yes,alwaysRaised=yes");
}

// Main Search function for Multi Codes
function hhotelSearchMultCode(cluster, lg, clecode, title, codetrack)
{
	var waction = FBRESA + "crs.phtml?clusterName="+cluster;
	if (lg != "") waction += "&langue="+lg;
	if (clecode != "") waction += "&AccessCode="+clecode;
	if (title != "") waction += "&title="+escape(title);
	if (codetrack != "") waction += "&FSTBKNGTrackLink="+codetrack;
	waction += "&crossSelling=NO"; // CROSS SELLING DESACTIVATED
	if (FB_profil != "") {
		waction += "&code="+FB_code_interface;
		waction += "&profil="+FB_profil;
	}
	window.open(waction,"search","toolbar=no,width=800,height=550,menubar=no,scrollbars=yes,resizable=yes,alwaysRaised=yes");
}

// Main Search function for Cross Selling

function hhotelSearchCrossSell(cluster, lg, codetrack, crossSelling)
{
	var waction = FBRESA + "crs.phtml?clusterName="+cluster;
	if (lg != "") waction += "&langue="+lg;
	if (codetrack != "") waction += "&FSTBKNGTrackLink="+codetrack;
	if (crossSelling != "") waction += "&crossSelling="+crossSelling;
	if (FB_profil != "") {
		waction += "&code="+FB_code_interface;
		waction += "&profil="+FB_profil;
	}
	window.open(waction,"search","toolbar=no,width=800,height=550,menubar=no,scrollbars=yes,resizable=yes,alwaysRaised=yes");
}

// MAIN AVAILABILITY CHECK 
function hhotelDispopriceFHP(cname, lg, codetrack, year, month, day, nights, currency)
{
	var waction = FBRESA+"dispoprice.phtml?clusterName="+cname+"&Hotelnames="+cname;
	if (lg != "") waction += "&langue="+lg;
	if (codetrack != "") waction += "&FSTBKNGTrackLink="+codetrack;
	if (year != "") waction += "&fromyear="+year;
	if (month != "") waction += "&frommonth="+month;
	if (day != "") waction += "&fromday="+day;
	if (nights != "") waction += "&nbdays="+nights;
	if (currency != "") waction += "&CurrencyLabel="+currency;
	waction += "&showPromotions=3";
	if (FB_profil != "") {
		waction += "&code="+FB_code_interface;
		waction += "&profil="+FB_profil;
	}
	window.open(waction,"reservation","toolbar=no,width=750,height=600,menubar=no,scrollbars=yes,resizable=yes,alwaysRaised=yes");
}


///////////////////////////////////////////////////////////////////////////////////////
// Form functions
// Simple form validation (used for compatibility issues)
function hhotelDispoprice(myForm)
{
	hhotelFormValidation(myForm, 0);
}

// Form validation with control
function hhotelFormValidation(myForm, mandatoryCode){
	if (mandatoryCode == 1 && myForm.AccessCode.value == "") {
		alert("You must type in your code ID");
		return (false);
	}
	var languetype = typeof myForm.action;
	myForm.action = FBRESA + "dispoprice.phtml";
	window.open('','dispoprice', 'toolbar=no,width=800,height=550,menubar=no,scrollbars=yes,resizable=yes');
	myForm.submit();
	return (true);
}

// Form: update the selected hotel name
function hhotelFormUpdateHotelnames(myForm)
{
	menuNum = myForm.HotelList.selectedIndex;
	if (menuNum == null)
		return;
	myForm.Hotelnames.value = myForm.HotelList.options[menuNum].value;
}

// Form: show the cancel page
function hhotelFormCancel(myForm){
	var CName = myForm.Hotelnames.value;
	var languetype = typeof myForm.langue;
	var langue;
	if (languetype == "undefined")
		langue = "";
	else
		langue = myForm.langue.value;
	if (CName == null || CName == 'All' || CName == ''){ alert('Please select a hotel first'); return (false); }
	return hhotelcancel(CName, langue);
}

// Form: show the extract page
function hhotelFormExtract(myForm)
{   
	var CName = myForm.Hotelnames.value;
	var languetype = typeof myForm.langue;
	var langue;
	if (languetype == "undefined")
		langue = "";
	else
		langue = myForm.langue.value;
	if (CName == null || CName == 'All' || CName == ''){ alert('Please select a hotel first'); return (false); }
	return hhotelExtract(CName, langue);
}

// Form: show languages
function hhotelShowLang(lang) 
{
	hhotelShowLang__(this.document, lang);
}

function hhotelShowLangOpener(lang)
{
	hhotelShowLang__(window.opener.document, lang);
	window.close();
}

function hhotelShowLang__(mydoc, lang)
{
	mydoc.idForm.langue.value=lang;

	var imgLang = hhotelLang2Img(lang);
	if (imgLang != "") {
		var formFlag = mydoc.selLgFlag;
		if (formFlag != null)
			mydoc.selLgFlag.src= "fastbooking/flags/"+imgLang+".gif";
		var formFlag = mydoc.selLgTxt;
		if (formFlag != null)
			mydoc.selLgTxt.src= "fastbooking/flags/"+imgLang+"lg.gif";
	}
}

// FastBooking language and image code
var FBLangCode = new Array (
	"uk", "france", "germany", "spain", "portuguese", "italy", "nether", "russian",
	"dansk", "svensk", "islensk", "norsk", "turk", "hungria", "greek", "arab",
	"china", "coreen", "japan","croate","czech","poland");
var FBLangImg = new Array (
	"grandbret", "france", "germany", "spain", "portuguese", "italy", "nether", "russia",
	"denmark", "sweeden", "iceland", "norway", "turkey", "hungary", "greek", "arab",
	"china", "coreen", "japan","croate","czech","poland");

function hhotelLang2Img(lang)
{
	for(i = 0; i < FBLangCode.length; i++) {
		if (FBLangCode[i] == lang)
			break;
	}
	return FBLangImg[i];
}

function hhotelLangSelector()
{
	window.open('fastbooking/flags/langSelector.html', '', 'width=330,height=180');
}


var langcodes = new Array("en", "uk", "fr", "france", "de", "germany", "es", "spain ", "pt", "portuguese", "it", "italy", "nl", "nether", "ja", "japan ", "ko", "coreen", "zh", "china", "ar", "arab", "ru", "russian", "tr", "turk", "el", "greek", "hu", "hungria", "da", "dansk", "sv", "svensk", "is", "islensk", "no", "norsk", "hr", "croate", "cs", "czech", "pl", "poland", "iw", "hebrew");

function selectLang()
{
if(navigator.appName == "Microsoft Internet Explorer") UL = navigator.userLanguage.substring(0, 2);
else if(navigator.appName == "Netscape") UL = navigator.language;
else return;

for(i = 0; i < langcodes.length; i += 2)
	if(UL == langcodes[i])
		break;
		
lang = (i < langcodes.length) ? langcodes[i+1] : "uk";
hhotelShowLang(lang);
}



//
// build year select
function build_year_select() {
		
var cur_date = new Date();
var cur_year = takeYear(cur_date);
	
cur_y = new Option(cur_year, cur_year, true, true);
document.idForm.fromyear.options[0] = cur_y;
if(document.idForm.toyear != null) {
	cur_yb = new Option(cur_year, cur_year, true, true);
	document.idForm.toyear.options[0] = cur_yb;
}
	
next_y = new Option(cur_year + 1, cur_year + 1, false, false);
document.idForm.fromyear.options[1] = next_y;
next_yb = new Option(cur_year + 1, cur_year + 1, false, false);
if(document.idForm.toyear != null) {
	document.idForm.toyear.options[1] = next_yb;
	}
}
	
// check departure date to arrival date + 1 day (every time the arrival date is changed)
function check_departure() {
	
	if(document.idForm.today != null) {
		var nbm = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];
		
		var ar_day = parseInt(document.idForm.fromday.value) + 1;
		var ar_month = parseInt(document.idForm.frommonth.value);
		var ar_year = parseInt(document.idForm.fromyear.value);
				
		if(ar_day > nbm[ar_month - 1]) {
			ar_day = 1;
			ar_month += 1;
			if(ar_month > 12) {
				ar_month = 1;
				ar_year += 1;
			}
		}
				
		var cur_date = new Date();
		var cur_year = takeYear(cur_date);
		
		document.idForm.today.selectedIndex = ar_day - 1;
		document.idForm.tomonth.selectedIndex = ar_month - 1;
		document.idForm.toyear.selectedIndex = ar_year - cur_year;
	}
}

// update departure : check 
function update_departure() {
	
	if(document.idForm.today != null) {
		
		var ar_day = parseInt(document.idForm.fromday.value) + 1;
		var ar_month = parseInt(document.idForm.frommonth.value);
		var ar_year = parseInt(document.idForm.fromyear.value);
				
		var de_day = parseInt(document.idForm.today.value) + 1;
		var de_month = parseInt(document.idForm.tomonth.value);
		var de_year = parseInt(document.idForm.toyear.value);
		
		if(de_year < ar_year) {
			check_departure();
		} else {
			if(de_year == ar_year) {
				if(de_month < ar_month) {
					check_departure();
				} else {
					if(de_month == ar_month) {
						if(de_day <= ar_day) {
							check_departure();
						}
					}
				}
			}
		}
				
	}
}

function takeYear(theDate)
{
        x = theDate.getYear();
        var y = x % 100;
        y += (y < 38) ? 2000 : 1900;
        return y;
}

// popup
function popup(url)
{
	window.open(url,"","toolbar=no,width=800,height=550,menubar=no,scrollbars=yes,resizable=yes,alwaysRaised=yes");
}