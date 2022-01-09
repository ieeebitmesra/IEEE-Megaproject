import SimpleReactFooter from "simple-react-footer";

const Footer=()=> {
    const description ="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse, quos! Optio nihil possimus laborum? Laudantium adipisci suscipit incidunt laborum accusamus molestiae quidem corporis expedita deleniti, nostrum esse, aut explicabo odit perferendis ut placeat sequi optio. Quidem deleniti esse, at nobis explicabo distinctio saepe non animi nulla tempore doloribus harum blanditiis et ipsa architecto culpa dolorum suscipit minima rerum necessitatibus? Vel numquam tenetur asperiores tempore perferendis.";
    const title = "BITASTIK";
    const columns = [
        {
            title: "Resources",
            resources: [
                {
                    name: "About",
                    link: "/about"
                },
                {
                    name: "Careers",
                    link: "/careers"
                },
                {
                    name: "Contact",
                    link: "/contact"
                },
                {
                    name: "Admin",
                    link: "/admin"
                }
            ]
        },
        {
            title: "Legal",
            resources: [
                {
                    name: "Privacy",
                    link: "/privacy"
                },
                {
                    name: "Terms",
                    link: "/terms"
                }
            ]
        },
        {
            title: "Visit",
            resources: [
                {
                    name: "Locations",
                    link: "/locations"
                },
                {
                    name: "Culture",
                    link: "/culture"
                }
            ]
        }
    ];
    return <SimpleReactFooter
        description={description}
        title={title}
        columns={columns}
        linkedin="fluffy_cat_on_linkedin"
        facebook="fluffy_cat_on_fb"
        twitter="fluffy_cat_on_twitter"
        instagram="fluffy_cat_live"
        youtube="UCFt6TSF464J8K82xeA?"
        pinterest="fluffy_cats_collections"
        copyright="BITASTIK"
        iconColor="black"
        backgroundColor="black"
        fontColor="white"
        copyrightColor="darkgrey"
    />;
};

export default Footer