import React from "react";
import logo from "../../assests/OIP.jpeg";
import { SocialIcon } from "react-social-icons";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-zinc-400 mt-3">
      <div className="w-11/12 mx-auto py-8">
        {/* Top Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Company */}
          <div className="flex flex-col gap-2">
            <img src={logo} alt="logo" width={99} />
            <h3 className="text-white font-semibold">Company</h3>
            <p className="hover:text-white transition-colors">About</p>
            <p className="hover:text-white transition-colors">Careers</p>
            <p className="hover:text-white transition-colors">Affiliates</p>
            <div className="flex gap-2 mt-2">
              <SocialIcon
                url="https://facebook.com/in/couetilc"
                style={{ height: 35, width: 35 }}
              />
              <SocialIcon
                url="https://twitter.com/in/couetilc"
                style={{ height: 35, width: 35 }}
              />
              <SocialIcon
                url="https://youtube.com/in/couetilc"
                style={{ height: 35, width: 35 }}
              />
              <SocialIcon
                url="https://google.com/in/couetilc"
                style={{ height: 35, width: 35 }}
              />
            </div>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-1">
            <h3 className="text-white font-semibold">Resources</h3>
            {[
              "Articles",
              "Blogs",
              "Chargesheets",
              "Code Challenges",
              "Docs",
              "Projects",
              "Videos",
              "Workspaces",
            ].map((item) => (
              <p key={item} className="hover:text-white transition-colors">
                {item}
              </p>
            ))}
          </div>

          {/* Support */}
          <div className="flex flex-col gap-1">
            <h3 className="text-white font-semibold">Support</h3>
            <p className="hover:text-white transition-colors">Help Center</p>
          </div>

          {/* Plans */}
          <div className="flex flex-col gap-1">
            <h3 className="text-white font-semibold">Plans</h3>
            <p className="hover:text-white transition-colors">
              Paid Memberships
            </p>
            <p className="hover:text-white transition-colors">For Students</p>
            <p className="hover:text-white transition-colors">
              Business Solutions
            </p>
          </div>

          {/* Subjects */}
          <div className="flex flex-col gap-1">
            <h3 className="text-white font-semibold">Subjects</h3>
            {[
              "AI",
              "Cloud Computing",
              "Computer Science",
              "Cybersecurity",
              "Data Science",
              "DevOps",
              "Game Development",
              "Machine Learning",
              "Web Development",
            ].map((item) => (
              <p key={item} className="hover:text-white transition-colors">
                {item}
              </p>
            ))}
          </div>

          {/* Languages */}
          <div className="flex flex-col gap-1">
            <h3 className="text-white font-semibold">Languages</h3>
            {["C", "C++", "Java", "JavaScript", "Python", "SQL", "Swift"].map(
              (item) => (
                <p key={item} className="hover:text-white transition-colors">
                  {item}
                </p>
              ),
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="bg-slate-50 h-[1px] w-full my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex gap-4">
            <p className="hover:text-white transition-colors">Privacy Policy</p>
            <p className="hover:text-white transition-colors">Cookie Policy</p>
            <p className="hover:text-white transition-colors">Terms</p>
          </div>
          <p className="mt-2 md:mt-0">
            Made with ♥ Target Technology © AKSH NOTION
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
