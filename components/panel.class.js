'use strict';
const moment = require('moment');
const jQuery = require('jquery');
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

    buildMarkUp(data){
        let html = `
           <h2>${data.properties.Name}</h2>
            <p><strong>Section:</strong> ${data.properties.Section}</p>
            <p><strong>Year Enacted:</strong> ${moment(data.properties.Year_Enacted).format('MMMM Do, YYYY')}</p>
            <div id="members-information">
                <div id="district-managers"></div>
                <div id="council-members"></div>
                <div id="district-inspectors"></div>
            </div>
        `;
        jQuery.ajax({
            method: 'GET',
            url: 'https://detroitmi.gov/rest/district-managers?_format=hal_json'
        }).done(function (data) {
            if(data && data.length) {
                let managersHtml = '<h1>Managers</h1><ul>'
                data.forEach((manager) => {
                    managersHtml += `<li>${manager.title}</li>`;
                });
                managersHtml += '</ul>';
                jQuery('#district-managers').html(managersHtml);
            }
        }).fail(function (error) {
        });

        jQuery.ajax({
            method: 'GET',
            url: 'https://detroitmi.gov/rest/council-members?_format=hal_json'
        }).done(function (data) {
            if(data && data.length) {
                let councilMembersHtml = '<h1>Council Members</h1><ul>'
                data.forEach((member) => {
                    councilMembersHtml += `<li>${member.field_organization_head_name}</li>`;
                });
                councilMembersHtml += '</ul>';
                jQuery('#council-members').html(councilMembersHtml);
            }
        }).fail(function (error) {
        });

        jQuery.ajax({
            method: 'GET',
            url: 'https://detroitmi.gov/rest/district-inspectors?_format=hal_json'
        }).done(function (data) {
            if(data && data.length) {
                let inspectorsHtml = '<h1>Managers</h1><ul>'
                data.forEach((inspector) => {
                    inspectorsHtml += `<li>${inspector.title}</li>`;
                });
                inspectorsHtml += '</ul>';
                jQuery('#district-inspectors').html(inspectorsHtml);
            }
        }).fail(function (error) {
        });
        
        return html;
    }
}