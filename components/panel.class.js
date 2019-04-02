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
                let managersHtml = '<h1>Managers</h1><ul>';
                let atLeastOne = false;
                data.forEach((manager) => {
                    if(manager.field_contact_position && manager.field_contact_position.toLowerCase().indexOf(selectedDistrictName) >= 0) {
                        managersHtml += `<li>${manager.title}</li>`;
                        atLeastOne = true;
                    }
                    
                });
                managersHtml += '</ul>';
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
                let councilMembersHtml = '<h1>Council Members</h1><ul>';
                let atLeastOne = false;
                data.forEach((member) => {
                    if(member.tid === (selectedDistrictId + '')) {
                        atLeastOne = true;
                        councilMembersHtml += `<li>${member.field_organization_head_name}</li>`;
                    }
                });
                councilMembersHtml += '</ul>';
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
                let inspectorsHtml = '<h1>Inspectors</h1><ul>'
                let atLeastOne = false;
                data.forEach((inspector) => {
                    if (inspector.field_responsibilities && inspector.field_responsibilities.toLowerCase().indexOf(selectedDistrictName) >= 0) {
                        atLeastOne = true;
                        inspectorsHtml += `<li>${inspector.title}</li>`;
                    }                    
                });
                inspectorsHtml += '</ul>';
                if(atLeastOne) {
                    jQuery('#district-inspectors').html(inspectorsHtml);
                }
            }
        }).fail(function (error) {
        });
        return html;
    }
}