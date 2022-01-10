import SimpleReactFooter from "simple-react-footer";

const Footer = () => {
    const description = ` With the shift in the mode of learning and our lives being digitalized, the college experience has been nothing but an exhausting experience for all of us.After the voracious college expectation soon turned into disappointment, we decided to come to the following solution.

BITASTIK a social media platform for the students of BIT Mesra to cater to their day - to - day college needs.A culmination of multitudes of ideas and platforms into one.

This app consists of an event to keep each one of you up to date with the latest happenings across the college without the fuss of being added to the newsrooms and various WhatsApp groups.Another key feature includes BIT notes that keep track of your to -do activities and makes your life hassle - free.The most fun and exciting element of this app that catches your attention is the confession page which anonymously posts everything you want, from your daily rants to secret love confessions, thus adding much entertainment to your exhausting e - college life.`
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