'use strict';
const moment = require('moment');
const jQuery = require('jQuery');
export default class Panel {
    constructor(container){
        this.container = container;
    }

    buildPanel(data){
        this.container.innerHTML = this.buildMarkUp(data);
    }

    clearPanel(){
        this.container.innerHTML = '';
    }

    buildMarkUp(selectedDistrict, selectedField){
        const districtsMap = {
            'district 1': 1276,
            'district 2': 1476,
            'district 3': 1481,
            'district 4': 1486,
            'district 5': 1346,
            'district 6': 1491,
            'district 7': 1511
        };
        const deputyManager={
            'district 1': "District 1 Deputy Manager ",
            'district 2': "District 2 Deputy Manager ",
            'district 3': "District 3 Deputy Manager",
            'district 4': "District 4 Deputy Manager",
            'district 5': "District 5 Deputy Manager",
            'district 6': "District 6 Deputy Manager",
            'district 7': "District 7 Deputy Manager",
        }

        const districtManager ={
            'district 1': "District 1 Manager ",
            'district 2': "District 2 Manager",
            'district 3': "District 3 Manager ",
            'district 4': "District 4 Manager",
            'district 5': "District 5 Manager",
            'district 6': "District 6 Manager",
            'district 7': "District 7 Manager",
        }
        const districtDescription={
            'district 1': "District 1 hugs Detroit’s northwest side, with Grand River Avenue, one of the state’s oldest trading lines, as its main thoroughfare.",
            'district 2': "District 2 encompasses a wide variety of neighborhoods, from cozy bungalows to stately mansions. The resurgent Avenue of Fashion is a staple of the area.",
            'district 3': "District 3 is eastside Detroit through and through. With Gratiot Avenue as one of its main streets, it is also home to City Airport.",
            'district 4': "District 4 is the city’s easternmost district, home to homes that border canals and longtime businesses reflective of the city’s immigrant history.",
            'district 5': "District 5 is Detroit’s largest district, which features a mix of historic neighborhoods, increased business activity and Belle Isle, the city’s largest park.",
            'district 6': "District 6 is one of Detroit’s most diverse areas, home to a number of Latino and Middle Eastern communities as well as some of Detroit’s oldest black-owned businesses.",
            'district 7': "District 7 is pure westside Detroit, with Rouge Park as one of this area’s centerpieces and a number of community-centric neighborhoods.",
        }
        const doYouKnows={
            'district 1': "Did you know Grand River is actually one of the oldest trails in Michigan?",
            'district 2': "Did you know Baker’s Jazz Lounge is the oldest continuously operating jazz club in the United States?",
            'district 3': "Did you know that Detroit’s oldest bar, the Two-Way Inn, is located in District 3?",
            'district 4': "Did you know Cadieux Cafe purports itself to be the only place in the United States where you can play feather bowling? It’s considered an old pastime in Belgium, where many immigrated from and settled on Detroit’s east side.",
            'district 5': "Did you know the landscape architect of Belle Isle Park, Fredrick Law Olmsted, also designed New York City’s Central Park?",
            'district 6': "Did you know Delray was its own village until the City of Detroit annexed it in 1906?",
            'district 7': "Did you know Aviation Sub is named because an old airfield, where Henry Ford once flew private planes, was once there?",
        }
        const learnMoreLinks={
            'district 1': "http://theneighborhoods.org/districts/district-1",
            'district 2': "http://theneighborhoods.org/districts/district-2",
            'district 3': "http://theneighborhoods.org/districts/district-3",
            'district 4': "http://theneighborhoods.org/districts/district-4",
            'district 5': "http://theneighborhoods.org/districts/district-5",
            'district 6': "http://theneighborhoods.org/districts/district-6",
            'district 7': "http://theneighborhoods.org/districts/district-7",
        }
        const selectedDistrictName = selectedDistrict.properties.name.toLowerCase();
        const districtDescriptionSection = districtDescription[selectedDistrictName];
        const doYouKnowsList = doYouKnows[selectedDistrictName];
        const learnMoreLinksList = learnMoreLinks[selectedDistrictName];

        //console.log("selectedDistrict"+ selectedDistrict.properties.name.toLowerCase() )
        let html = `
        <div class="content-section__logo">
            <img src="http://detroitmi.gov/sites/default/files/inline-images/logo-220x220_0.jpg">
            </div>
            <h2>${selectedDistrictName.toUpperCase()}</h2>
            <p>${districtDescriptionSection}</p>
            <div class="members-information">
               
                <div class="council-members"></div>
                <div class="district-managers"></div>
                <div class="deputy-managers"></div>
                <div class="district-inspectors"></div>
            </div>
            <div class="doYouKnows">
             <h3>DID YOU KNOW?</h3>
             <p>${doYouKnowsList}</p>
            </div>
            <div class="LearnMoreButton">
            <button><a href="${learnMoreLinksList}"> Learn More</a>
        </button>
            </div>
        `;
        //APIs
        // https://detroitmi.gov/rest/district-managers?_format=json
        // https://detroitmi.gov/rest/council-members?_format=json
        // https://detroitmi.gov/rest/district-inspectors?_format=json
        // Note: inspector is changed to enforcers
      

        jQuery.ajax({
            method: 'GET',
            url: 'https://detroitmi.gov/rest/council-members?_format=json'
        }).done(function (data) {
            if(data && data.length) {
                const selectedDistrictId = districtsMap[selectedDistrictName];
                let councilMembersHtml = '<div class="council-members__container container"><span class="council-members__container--title">Council</span>';

                let atLeastOne = false;
                const uniqueNames = {}
                data.forEach((member) => {
                    if(member.tid === (selectedDistrictId + '') && !uniqueNames[member.field_organization_head_name && member.field_image]) {
                        uniqueNames[member.field_organization_head_name && member.field_image] = true;
                        atLeastOne = true;
                        councilMembersHtml += `<div class="council-members__container--row ">
                        <div class="council-members__container--row__image container__col-md-2"> 
                        <img class="member-image" src = "${member.field_image}"></div>
                        <div class="council-members__container--row__name container__col-md-8">
                        <ul>
                        <li>${member.field_organization_head_name}</li>
                        </ul>
                        </div>
                        </div>`;

                    }
                });
                councilMembersHtml += '</div>';
                if(atLeastOne) {
                    jQuery('.council-members').html(councilMembersHtml);
                }
            }
        }).fail(function (error) {
        });
        jQuery.ajax({
            method: 'GET',
            url: 'https://detroitmi.gov/rest/district-managers?_format=json'
        }).done(function (data) {
            if(data && data.length) {
                let atLeastOne = false;
                // District Manager data
                const districtManagerPosition = districtManager[selectedDistrictName];
               
                let DistrictManager = '<div class="district-managers__container container">'+'<span class="district-managers__container--title">District Manager</span>';
                data.forEach((districtManager) => {
                    if(districtManager.field_contact_position === (districtManagerPosition + '')) {
                        DistrictManager +=
                         `<div class="district-managers__container--row container__row">
                         <div class="district-managers__container--row__image container__col-md-2"> 
                         <img class="member-image" src = "${districtManager.field_portrait}"></div>
                         <div class="district-managers__container--row__name container__col-md-8"> <ul>
                         <li>${districtManager.title}</li>
                         <li>${districtManager.field_telephone}</li>
                         </ul>
                         </div>
                        
                        </div>
                        <br>
                        <div class=""></div>
                        <span></span>`;
                        atLeastOne = true;
                    }
                    console.log("deputy-managers"+ districtManager.field_contact_position === (districtManagerPosition + ''))
                });
                DistrictManager += '</div>';
                if(atLeastOne) {
                    jQuery('.district-managers').html(DistrictManager);
                }
                // Deputy Manager data
                const selectedPosition = deputyManager[selectedDistrictName];
                let managersHtml = '<div class="district-managers__container container">'+'<span class="district-managers__container--title">Deputy Manager</span>';
               
                data.forEach((manager) => {
                    if(manager.field_contact_position === (selectedPosition + '')) {
                        managersHtml += `
                        <div class="district-managers__container--row">
                        <div class="district-managers__container--row__image"> 
                        <img class="member-image" src = "${manager.field_portrait}"></div>
                        <div class="district-managers__container--row__name "> <ul>
                        <li>${manager.title}</li>
                        <li>${manager.field_telephone}</li>
                        </ul>
                        </div>`;
                        atLeastOne = true;
                    }
                    console.log("manager"+ manager.field_contact_position === (selectedPosition + ''));
                });
                managersHtml += '</div>';
                if(atLeastOne) {
                    jQuery('.deputy-managers').html(managersHtml);
                }
            }
           
        }).fail(function (error) {
        });
 // Note: inspectors for enforcers
        jQuery.ajax({
            method: 'GET',
            url: 'https://detroitmi.gov/rest/district-inspectors?_format=json'
        }).done(function (data) {
            if(data && data.length) {
                let inspectorsHtml = '<div class="district-inspectors__container container"><span class="district-inspectors__container--title">Code Enforcer</span><a>'
                let atLeastOne = false;
                data.forEach((inspector) => {
                    if (inspector.field_responsibilities && inspector.field_responsibilities.toLowerCase().indexOf(selectedDistrictName) >= 0) {
                        atLeastOne = true;
                        inspectorsHtml += `
                        <div class="district-managers__container--row">
                        <div class="district-managers__container--row__image"> 
                        <div class="district-managers__container--row__name"> 
                        <ul>
                        <li>${inspector.title}</li>
                        <li>${inspector.field_telephone}</li>
                        </ul>
                        </div>`;
                    }                    
                });
                inspectorsHtml += '</a>'+'</div>';
                if(atLeastOne) {
                    jQuery('.district-inspectors').html(inspectorsHtml);
                }
            }
        }).fail(function (error) {
        });
        return html;
    }
}