'use strict';

export default class Panel {
    constructor(container) {
        this.container = container;
    }

    buildPanel(data, _controller) {
        this.container.innerHTML = this.buildMarkUp(data, _controller);
    }

    clearPanel() {
        this.container.innerHTML = '';
    }

    buildCouncil(district, _controller){
        let tid = "";
        let markup = "";
        let count = 0;
        switch (district.properties.districts) {
            case "1":
                tid = "1276";
                break;

            case "2":
                tid = "1476";
                break;

            case "3":
                tid = "1481";
                break;

            case "4":
                tid = "1486";
                break;

            case "5":
                tid = "1346";
                break;

            case "6":
                tid = "1491";
                break;

            case "7":
                tid = "1511";
                break;
        
            default:
                break;
        }
        _controller.districtData[0].data.forEach((member) => {
            if (count < 1){
                if (member.tid == tid) {
                    console.log('found one');
                    markup = `
                    <div class="council-members__container">
                        <span class="council-members__container--title">Council</span>
                        <div class="council-members__container--row ">
                        <div class="council-members__container--row__image "> 
                            <img class="member-image" src = "http://detroitmi.gov/${member.field_image}"></div>
                        <div class="council-members__container--row__name ">
                            <ul>
                                <li><a href="https://detroitmi.gov/taxonomy/term/${tid}">${member.field_organization_head_name}</a></li>
                                <li>${member.field_phone}</li>
                            </ul>
                        </div>
                    </div>`;
                    console.log(markup);
                    count++;
                }
            }
        });
        return markup;
    }

    buildManager(district, _controller){
        let markup = "";
        let count = 0;
        _controller.districtData[1].data.forEach((member) => {
            if (count < 1){
                if (member.field_contact_position.includes(district.properties.districts) && member.field_contact_position.includes('Manager') && !member.field_contact_position.includes('Deputy')) {
                    console.log('found one');
                    markup = `
                    <div class="district-managers__container">
                        <span class="district-managers__container--title">District Manager</span>
                        <div class="district-managers__container--row ">
                         <div class="district-managers__container--row__image"> 
                            <img class="member-image" src = "http://detroitmi.gov/${member.field_portrait}"></div>
                         <div class="district-managers__container--row__name">
                            <ul>
                                <li><a href="https://detroitmi.gov/departments/department-neighborhoods/district-${district.properties.districts}">${member.title}</a></li>
                                <li>${member.field_telephone}</li>
                                <li>${member.field_email_address}</li>
                            </ul>
                         </div>
                        </div>
                        <br>
                        <div class=""></div>
                        <span></span>
                    </div>`;
                    count++;
                }
            }
        });
        return markup;
    }

    buildDeputy(district, _controller){
        let markup = "";
        let count = 0;
        _controller.districtData[1].data.forEach((member) => {
            if (count < 1){
                if (member.field_contact_position.includes(district.properties.districts) && member.field_contact_position.includes('Manager') && member.field_contact_position.includes('Deputy')) {
                    console.log('found one');
                    markup = `
                    <div class="district-managers__container">
                        <span class="district-managers__container--title">District Manager</span>
                        <div class="district-managers__container--row ">
                         <div class="district-managers__container--row__image"> 
                            <img class="member-image" src = "http://detroitmi.gov/${member.field_portrait}"></div>
                         <div class="district-managers__container--row__name">
                            <ul>
                                <li><a href="https://detroitmi.gov/departments/department-neighborhoods/district-${district.properties.districts}">${member.title}</a></li>
                                <li>${member.field_telephone}</li>
                                <li>${member.field_email_address}</li>
                            </ul>
                         </div>
                        </div>
                        <br>
                        <div class=""></div>
                        <span></span>
                    </div>`;
                    count++;
                }
            }
        });
        return markup;
    }


    buildInspector(district, _controller){
        let markup = "";
        let count = 0;
        _controller.districtData[2].data.forEach((member) => {
            if (count < 1){
                if (member.field_responsibilities.includes(district.properties.districts)) {
                    console.log('found one');
                    markup = `
                    <div class="district-managers__container">
                        <span class="district-managers__container--title">District Manager</span>
                        <div class="district-managers__container--row ">
                         <div class="district-managers__container--row__name">
                            <ul>
                                <li>${member.title}</li>
                                <li>${member.field_telephone}</li>
                            </ul>
                         </div>
                        </div>
                        <br>
                        <div class=""></div>
                        <span></span>
                    </div>`;
                    count++;
                }
            }
        });
        return markup;
    }

    buildMarkUp(selectedDistrict, _controller) {
        console.log(selectedDistrict);
        const districtUrl = "http://theneighborhoods.org/districts/";
        const imageUrl = "http://detroitmi.gov/";
        const memberUrl = "https://detroitmi.gov/departments/department-neighborhoods/";
        const councilUrl = "https://detroitmi.gov/government/city-council/";
        const newsletterUrl = "https://detroitmi.gov/departments/department-neighborhoods/";
        
        const deputyManager = {
            'district 1': "District 1 Deputy Manager ",
            'district 2': "District 2 Deputy Manager ",
            'district 3': "District 3 Deputy Manager",
            'district 4': "District 4 Deputy Manager",
            'district 5': "District 5 Deputy Manager",
            'district 6': "District 6 Deputy Manager",
            'district 7': "District 7 Deputy Manager",
        }

        const districtManager = {
            'district 1': "District 1 Manager ",
            'district 2': "District 2 Manager",
            'district 3': "District 3 Manager ",
            'district 4': "District 4 Manager",
            'district 5': "District 5 Manager",
            'district 6': "District 6 Manager",
            'district 7': "District 7 Manager",
        }
        const districtDescription = {
            'district 1': "District 1 hugs Detroit’s northwest side, with Grand River Avenue, one of the state’s oldest trading lines, as its main thoroughfare.",
            'district 2': "District 2 encompasses a wide variety of neighborhoods, from cozy bungalows to stately mansions. The resurgent Avenue of Fashion is a staple of the area.",
            'district 3': "District 3 is eastside Detroit through and through. With Gratiot Avenue as one of its main streets, it is also home to City Airport.",
            'district 4': "District 4 is the city’s easternmost district, home to homes that border canals and longtime businesses reflective of the city’s immigrant history.",
            'district 5': "District 5 is Detroit’s largest district, which features a mix of historic neighborhoods, increased business activity and Belle Isle, the city’s largest park.",
            'district 6': "District 6 is one of Detroit’s most diverse areas, home to a number of Latino and Middle Eastern communities as well as some of Detroit’s oldest black-owned businesses.",
            'district 7': "District 7 is pure westside Detroit, with Rouge Park as one of this area’s centerpieces and a number of community-centric neighborhoods.",
        }
        const doYouKnows = {
            'district 1': "Did you know Grand River is actually one of the oldest trails in Michigan?",
            'district 2': "Did you know Baker’s Jazz Lounge is the oldest continuously operating jazz club in the United States?",
            'district 3': "Did you know that Detroit’s oldest bar, the Two-Way Inn, is located in District 3?",
            'district 4': "Did you know Cadieux Cafe purports itself to be the only place in the United States where you can play feather bowling? It’s considered an old pastime in Belgium, where many immigrated from and settled on Detroit’s east side.",
            'district 5': "Did you know the landscape architect of Belle Isle Park, Fredrick Law Olmsted, also designed New York City’s Central Park?",
            'district 6': "Did you know Delray was its own village until the City of Detroit annexed it in 1906?",
            'district 7': "Did you know Aviation Sub is named because an old airfield, where Henry Ford once flew private planes, was once there?",
        }
        const learnMoreLinks = {
            'district 1': districtUrl + "district-1",
            'district 2': districtUrl + "district-2",
            'district 3': districtUrl + "district-3",
            'district 4': districtUrl + "district-4",
            'district 5': districtUrl + "district-5",
            'district 6': districtUrl + "district-6",
            'district 7': districtUrl + "district-7",
        }
        const memberLinks={
            'district 1': memberUrl + "district-1",
            'district 2': memberUrl + "district-2",
            'district 3': memberUrl + "district-3",
            'district 4': memberUrl + "district-4",
            'district 5': memberUrl + "district-5",
            'district 6': memberUrl + "district-6",
            'district 7': memberUrl + "district-7",
        }
        const councilLinks={
            'district 1': councilUrl + "city-council-district-1",
            'district 2': councilUrl + "city-council-district-2",
            'district 3': councilUrl + "city-council-district-3",
            'district 4': councilUrl + "city-council-district-4",
            'district 5': councilUrl + "city-council-district-5",
            'district 6': councilUrl + "city-council-district-6",
            'district 7': councilUrl + "city-council-district-7",
        }
        const newsletterLinks = {
            'district 1': memberUrl + "district-1#documents-block",
            'district 2': memberUrl + "district-2#documents-block",
            'district 3': memberUrl + "district-3#documents-block",
            'district 4': memberUrl + "district-4#documents-block",
            'district 5': memberUrl + "district-5#documents-block",
            'district 6': memberUrl + "district-6#documents-block",
            'district 7': memberUrl + "district-7#documents-block",
        }
        const selectedDistrictName = selectedDistrict.properties.name.toLowerCase();
        const districtDescriptionSection = districtDescription[selectedDistrictName];
        const doYouKnowsList = doYouKnows[selectedDistrictName];
        const learnMoreLinksList = learnMoreLinks[selectedDistrictName];
        const memberlinkList = memberLinks[selectedDistrictName];
        const councillinkList = councilLinks[selectedDistrictName];
        const newsletterLinksList = newsletterLinks[selectedDistrictName];

        //console.log("selectedDistrict"+ selectedDistrict.properties.name.toLowerCase() )

        let html = `
        <div class="content-section__logo">
        <img src="http://detroitmi.gov/sites/default/files/inline-images/logo-220x220_0.jpg">
        </div>
        <h2>${selectedDistrictName.toUpperCase()}</h2>
        <p>${districtDescriptionSection}</p>
        <div class="members-information">
            <div class="container">
            <ul class="container__row">
            <li class="council-members container__col-sm-12 container__col-md-6">
            ${this.buildCouncil(selectedDistrict, _controller)}
            </li>
            <li></li>
            </ul>
            </div>
            <div class="container">
            <ul class="container__row">
                <li class="district-managers container__col-sm-12 container__col-md-6">${this.buildManager(selectedDistrict, _controller)}</li>
                <li class="deputy-managers container__col-sm-12 container__col-md-6">${this.buildDeputy(selectedDistrict, _controller)}</li>
            </ul>
            </div>
            <div class="container">
            <ul class="container__row">
                <li class="district-inspectors container__col-sm-12 container__col-md-6">${this.buildInspector(selectedDistrict, _controller)}</li>
                <li class="nfos-police district-managers__container container__col-sm-12 container__col-md-6">
                    <div class="district-managers__container--title">
                        NPOS
                    </div>
                    <p><a href="https://detroitmi.gov/departments/police-department/precincts-and-neighborhood-police-officers">List
                            of police officers</a></p>
                </li>
                </ul>
                </div>
                <div class="doYouKnows">
                <article class="fun-fact-logo">
                <span class="fa fa-rocket"></span>
                </article>
                <article class="text-container">
                <h3>DID YOU KNOW?</h3>
                <p>${doYouKnowsList}</p>
                </article>
                </div>
                <div class="content-section__LearnMoreButton">
                    <button>
                    <a href="${newsletterLinksList}">Read Newsletter</a>
                    </button>
                    <button>
                    <a href="${learnMoreLinksList}">Learn More</a>
                    </button>
                </div>
        `;
        return html;
    }
}