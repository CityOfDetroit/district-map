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
            <div id="members-information">
                <div id="district-managers"></div>
                <div id="council-members"></div>
                <div id="district-inspectors"></div>
            </div>
        `;
        // https://detroitmi.gov/rest/district-managers?_format=hal_json
        // https://detroitmi.gov/rest/council-members?_format=hal_json
        // https://detroitmi.gov/rest/district-inspectors?_format=hal_json
        jQuery.ajax({
            method: 'GET',
            url: 'https://detroitmi.gov/rest/district-managers?_format=hal_json'
        }).done(function (data) {
            if(data && data.length) {
                let managersHtml = '<article class="text-content">'+'<span>Managers</span><a>';
                let atLeastOne = false;
                data.forEach((manager) => {
                    if(manager.field_contact_position && manager.field_contact_position.toLowerCase().indexOf(selectedDistrictName) >= 0) {
                        managersHtml += `<span>${manager.title}</span><br>`;
                        atLeastOne = true;
                    }
                });
                managersHtml += '</a>'+'</article>';
                if(atLeastOne) {
                    jQuery('#district-managers').html(managersHtml);
                }
            }
        }).fail(function (error) {
        });

        jQuery.ajax({
            method: 'GET',
            url: 'https://detroitmi.gov/rest/council-members?_format=hal_json'
        }).done(function (data) {
            if(data && data.length) {
                const selectedDistrictId = districtsMap[selectedDistrictName];
                let councilMembersHtml = '<article class="text-content"><span>Council Members</span><a>';
                let atLeastOne = false;
                data.forEach((member) => {
                    if(member.tid === (selectedDistrictId + '')) {
                        atLeastOne = true;
                        councilMembersHtml += `<span>${member.field_organization_head_name}</span><br>`;
                    }
                });
                councilMembersHtml += '</a></article>';
                if(atLeastOne) {
                    jQuery('#council-members').html(councilMembersHtml);
                }
            }
        }).fail(function (error) {
        });

        jQuery.ajax({
            method: 'GET',
            url: 'https://detroitmi.gov/rest/district-inspectors?_format=hal_json'
        }).done(function (data) {
            if(data && data.length) {
                let inspectorsHtml = '<article class="text-content"><span>Inspectors</span><a>'
                let atLeastOne = false;
                data.forEach((inspector) => {
                    if (inspector.field_responsibilities && inspector.field_responsibilities.toLowerCase().indexOf(selectedDistrictName) >= 0) {
                        atLeastOne = true;
                        inspectorsHtml += `<span>${inspector.title}</span>`;
                    }                    
                });
                inspectorsHtml += '</a>';
                if(atLeastOne) {
                    jQuery('#district-inspectors').html(inspectorsHtml);
                }
            }
        }).fail(function (error) {
        });
        return html;
    }
}