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

    buildMarkUp(selectedDistrict){
        const districtsMap = {
            'district 1': 1276,
            'district 2': 1476,
            'district 3': 1481,
            'district 4': 1486,
            'district 5': 1346,
            'district 6': 1491,
            'district 7': 1511
        };
        const selectedDistrictName = selectedDistrict.properties.name.toLowerCase();
        let html = `
            <h2>${selectedDistrict.properties.Name}</h2>
            <p><strong>Section:</strong> ${selectedDistrict.properties.Section}</p>
            <p><strong>Year Enacted:</strong> ${moment(selectedDistrict.properties.Year_Enacted).format('MMMM Do, YYYY')}</p>
            <div class="members-information">
               
                <div class="council-members"></div>
                <div class="district-managers"></div>
                <div class="district-inspectors"></div>
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
                        councilMembersHtml += `<div class="council-members__container--row container__row">
                        <div class="council-members__container--row__image container__col-md-2"> 
                        <img class="member-image" src = "${member.field_image}"></div>
                        <div class="council-members__container--name container__col-md-4">${member.field_organization_head_name}</div>
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
                let managersHtml = '<div class="district-managers__container container">'+'<span class="district-managers__container--title">District Managers</span><a>';
                let atLeastOne = false;
                data.forEach((manager) => {
                    if(manager.field_contact_position=="Deputy District Manager" && manager.field_contact_position.toLowerCase().indexOf(selectedDistrictName) >= 0) {
                        managersHtml += `<span>${manager.title}</span><br>`;
                        atLeastOne = true;
                    }
                });
                managersHtml += '</a>'+'</div>';
                if(atLeastOne) {
                    jQuery('.district-managers').html(managersHtml);
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
                let inspectorsHtml = '<article class="district-inspectors__container"><span class="district-inspectors__container--title">Enforcers</span><a>'
                let atLeastOne = false;
                data.forEach((inspector) => {
                    if (inspector.field_responsibilities && inspector.field_responsibilities.toLowerCase().indexOf(selectedDistrictName) >= 0) {
                        atLeastOne = true;
                        inspectorsHtml += `<span>${inspector.title}</span><br>
                        <span>${inspector.field_contact_position}</span><br>
                        <span>${inspector.field_telephone}</span>`;
                    }                    
                });
                inspectorsHtml += '</a>';
                if(atLeastOne) {
                    jQuery('.district-inspectors').html(inspectorsHtml);
                }
            }
        }).fail(function (error) {
        });
        return html;
    }
}