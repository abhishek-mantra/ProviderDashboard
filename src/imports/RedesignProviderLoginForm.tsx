import svgPaths from "./svg-vax2x45yy5";

function Sidebar() {
  return <div className="h-[960px] shrink-0 w-[320px]" data-name="Sidebar" />;
}

function Icon() {
  return (
    <div className="relative shrink-0 size-[28px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 28 28">
        <g id="Icon">
          <path d={svgPaths.p3f5dc300} id="Vector" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
          <path d={svgPaths.p1ac9bc00} id="Vector_2" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container2() {
  return (
    <div className="bg-[#f3faff] content-stretch flex items-center justify-center px-[14px] py-[2px] relative rounded-[16px] shrink-0 size-[56px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-2 border-[#d9eeff] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <Icon />
    </div>
  );
}

function Heading() {
  return (
    <div className="h-[36px] relative shrink-0 w-full" data-name="Heading 1">
      <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[36px] left-0 not-italic text-[#020817] text-[24px] top-[-2px] tracking-[-0.6px] whitespace-nowrap">Basic Information</p>
    </div>
  );
}

function Paragraph() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[22.5px] left-0 not-italic text-[#64748b] text-[15px] top-[-2px] whitespace-nowrap">Enter your personal information to get closer to clients.</p>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col gap-[6px] h-[64.5px] items-start relative shrink-0 w-[364.5px]" data-name="Container">
      <Heading />
      <Paragraph />
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex gap-[16px] h-[64.5px] items-center relative shrink-0 w-full" data-name="Container">
      <Container2 />
      <Container3 />
    </div>
  );
}

function Icon1() {
  return (
    <div className="absolute left-0 size-[17px] top-[2.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Icon">
          <path d={svgPaths.p1a2a9d80} id="Vector" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d={svgPaths.p2ec70180} id="Vector_2" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div className="absolute h-[22.5px] left-[73.59px] top-0 w-[6.516px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#fb2c36] text-[15px] top-[-2px] whitespace-nowrap">*</p>
    </div>
  );
}

function Label() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <Icon1 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-[25px] not-italic text-[#020817] text-[15px] top-[-2px] whitespace-nowrap">Name</p>
      <Text />
    </div>
  );
}

function Input() {
  return (
    <div className="bg-[#f8fbff] h-[54px] relative rounded-[16px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[4px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[14px] whitespace-nowrap">John Wilson</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] h-[86.5px] items-start left-0 top-0 w-[798px]" data-name="Container">
      <Label />
      <Input />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-0 size-[17px] top-[2.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Icon">
          <path d={svgPaths.pcd14500} id="Vector" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d={svgPaths.p1c5f0a00} id="Vector_2" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div className="absolute h-[22.5px] left-[145.16px] top-0 w-[6.516px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#fb2c36] text-[15px] top-[-2px] whitespace-nowrap">*</p>
    </div>
  );
}

function Label1() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <Icon2 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-[25px] not-italic text-[#020817] text-[15px] top-[-2px] whitespace-nowrap">Practice Address</p>
      <Text1 />
    </div>
  );
}

function Input1() {
  return (
    <div className="bg-[#f8fbff] flex-[597.141_0_0] h-[54px] min-h-px min-w-px relative rounded-[16px]" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[16px] py-[4px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[14px] whitespace-nowrap">Enter practice address</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[17px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Icon">
          <path d={svgPaths.pcd14500} id="Vector" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d={svgPaths.p1c5f0a00} id="Vector_2" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div className="flex-[1_0_0] h-[22.5px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#020817] text-[15px] top-[-2px] whitespace-nowrap">Visible</p>
      </div>
    </div>
  );
}

function Text3() {
  return <div className="bg-white rounded-[33554400px] shrink-0 size-[16px]" data-name="Text" />;
}

function Switch() {
  return (
    <div className="bg-[#d1d5db] h-[18.391px] relative rounded-[33554400px] shrink-0 w-[32px]" data-name="Switch">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center p-px relative size-full">
        <Text3 />
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="h-[17px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5833 15.5833">
            <path d={svgPaths.p2920c980} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.15%_37.83%_45.83%_37.88%]" data-name="Vector">
        <div className="absolute inset-[-16.65%_-17.15%_-16.66%_-17.16%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.54645 5.67003">
            <path d={svgPaths.p2538d7a0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[29.17%] left-1/2 right-[49.96%] top-[70.83%]" data-name="Vector">
        <div className="absolute inset-[-0.71px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.42375 1.41667">
            <path d="M0.708333 0.708333H0.715417" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SlotClone() {
  return (
    <div className="relative shrink-0 size-[17px]" data-name="SlotClone">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon4 />
      </div>
    </div>
  );
}

function Container7() {
  return (
    <div className="bg-[#f3faff] h-[54px] relative rounded-[16px] shrink-0 w-[188.859px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center px-[21px] py-[13px] relative size-full">
        <Icon3 />
        <Text2 />
        <Switch />
        <SlotClone />
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex gap-[12px] h-[54px] items-start relative shrink-0 w-full" data-name="Container">
      <Input1 />
      <Container7 />
    </div>
  );
}

function Container5() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] h-[86.5px] items-start left-0 top-[114.5px] w-[798px]" data-name="Container">
      <Label1 />
      <Container6 />
    </div>
  );
}

function Icon5() {
  return (
    <div className="absolute left-0 size-[17px] top-[2.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Icon">
          <path d={svgPaths.pcd14500} id="Vector" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d={svgPaths.p1c5f0a00} id="Vector_2" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
        </g>
      </svg>
    </div>
  );
}

function Text4() {
  return (
    <div className="absolute h-[22.5px] left-[164.92px] top-0 w-[6.516px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#fb2c36] text-[15px] top-[-2px] whitespace-nowrap">*</p>
    </div>
  );
}

function Label2() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <Icon5 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-[25px] not-italic text-[#020817] text-[15px] top-[-2px] whitespace-nowrap">Location/Landmark</p>
      <Text4 />
    </div>
  );
}

function Input2() {
  return (
    <div className="absolute bg-white h-[54px] left-0 rounded-[16px] top-0 w-[798px]" data-name="Input">
      <div className="content-stretch flex items-center overflow-clip pl-[16px] pr-[224px] py-[4px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[14px] whitespace-nowrap">230 Broadway, New York, NY 10007, USA</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Icon6() {
  return (
    <div className="absolute left-[0.23px] size-[17px] top-[3px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g clipPath="url(#clip0_4350_871)" id="Icon">
          <path d={svgPaths.p2e9e9d00} id="Vector" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d={svgPaths.padbbe00} id="Vector_2" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
        </g>
        <defs>
          <clipPath id="clip0_4350_871">
            <rect fill="white" height="17" width="17" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[23px] relative shrink-0 w-[139px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon6 />
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-[82.73px] not-italic text-[#043570] text-[15px] text-center top-[-1.75px] whitespace-nowrap">Current Location</p>
      </div>
    </div>
  );
}

function Container11() {
  return <div className="bg-[#e5e7eb] h-[24px] shrink-0 w-px" data-name="Container" />;
}

function Icon7() {
  return (
    <div className="h-[18px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_16.67%]" data-name="Vector">
        <div className="absolute inset-[-5%_-6.25%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 13.5 16.4998">
            <path d={svgPaths.p30e05580} id="Vector" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.17%_37.5%_45.83%_37.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 6 6">
            <path d={svgPaths.p93ea200} id="Vector" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute content-stretch flex gap-[11.766px] h-[24px] items-center left-[604.23px] top-[15px] w-[182px]" data-name="Container">
      <Button />
      <Container11 />
      <Button1 />
    </div>
  );
}

function Container9() {
  return (
    <div className="h-[54px] relative shrink-0 w-full" data-name="Container">
      <Input2 />
      <Container10 />
    </div>
  );
}

function Container8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] h-[86.5px] items-start left-0 top-[229px] w-[798px]" data-name="Container">
      <Label2 />
      <Container9 />
    </div>
  );
}

function Icon8() {
  return (
    <div className="absolute left-0 size-[17px] top-[2.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Icon">
          <path d="M5.66667 1.41667V4.25" id="Vector" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d="M11.3333 1.41667V4.25" id="Vector_2" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d={svgPaths.p2cd22c80} id="Vector_3" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d="M2.125 7.08333H14.875" id="Vector_4" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
        </g>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="absolute h-[22.5px] left-[120.14px] top-0 w-[6.516px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#fb2c36] text-[15px] top-[-2px] whitespace-nowrap">*</p>
    </div>
  );
}

function Label3() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <Icon8 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-[25px] not-italic text-[#020817] text-[15px] top-[-2px] whitespace-nowrap">Date of Birth</p>
      <Text5 />
    </div>
  );
}

function Input3() {
  return (
    <div className="bg-[#f8fbff] h-[54px] relative rounded-[16px] shrink-0 w-full" data-name="Input">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container13() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] h-[86.5px] items-start left-0 top-0 w-[387px]" data-name="Container">
      <Label3 />
      <Input3 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="absolute left-0 size-[17px] top-[2.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g clipPath="url(#clip0_4350_857)" id="Icon">
          <path d={svgPaths.p26d04000} id="Vector" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
        </g>
        <defs>
          <clipPath id="clip0_4350_857">
            <rect fill="white" height="17" width="17" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text6() {
  return (
    <div className="absolute h-[22.5px] left-[145.98px] top-0 w-[6.516px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#fb2c36] text-[15px] top-[-2px] whitespace-nowrap">*</p>
    </div>
  );
}

function Label4() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[152.5px]" data-name="Label">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon9 />
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-[25px] not-italic text-[#020817] text-[15px] top-[-2px] whitespace-nowrap">Contact Number</p>
        <Text6 />
      </div>
    </div>
  );
}

function Icon10() {
  return (
    <div className="h-[17px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%]" data-name="Vector">
        <div className="absolute inset-[-5%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.5833 15.5833">
            <path d={svgPaths.p2920c980} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[29.15%_37.83%_45.83%_37.88%]" data-name="Vector">
        <div className="absolute inset-[-16.65%_-17.15%_-16.66%_-17.16%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.54645 5.67003">
            <path d={svgPaths.p2538d7a0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          </svg>
        </div>
      </div>
      <div className="absolute bottom-[29.17%] left-1/2 right-[49.96%] top-[70.83%]" data-name="Vector">
        <div className="absolute inset-[-0.71px]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.42375 1.41667">
            <path d="M0.708333 0.708333H0.715417" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function SlotClone1() {
  return (
    <div className="relative shrink-0 size-[17px]" data-name="SlotClone">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex gap-[8px] h-[22.5px] items-center relative shrink-0 w-full" data-name="Container">
      <Label4 />
      <SlotClone1 />
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[39.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">🇮🇳 +91</p>
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#f8fbff] h-[54px] relative rounded-[16px] shrink-0 w-[128px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between px-[17px] py-[9px] relative size-full">
        <Text7 />
        <Icon11 />
      </div>
    </div>
  );
}

function Input4() {
  return (
    <div className="bg-[#f8fbff] flex-[247_0_0] h-[54px] min-h-px min-w-px relative rounded-[16px]" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center px-[16px] py-[4px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[14px] whitespace-nowrap">9985698569</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex gap-[12px] h-[54px] items-start relative shrink-0 w-full" data-name="Container">
      <Button2 />
      <Input4 />
    </div>
  );
}

function Container14() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] h-[86.5px] items-start left-[411px] top-0 w-[387px]" data-name="Container">
      <Container15 />
      <Container16 />
    </div>
  );
}

function Container12() {
  return (
    <div className="absolute h-[86.5px] left-0 top-[343.5px] w-[798px]" data-name="Container">
      <Container13 />
      <Container14 />
    </div>
  );
}

function Icon12() {
  return (
    <div className="absolute left-0 size-[17px] top-[2.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g clipPath="url(#clip0_4350_803)" id="Icon">
          <path d={svgPaths.padbbe00} id="Vector" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d={svgPaths.p2e1d8980} id="Vector_2" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d="M1.41667 8.5H15.5833" id="Vector_3" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
        </g>
        <defs>
          <clipPath id="clip0_4350_803">
            <rect fill="white" height="17" width="17" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="absolute h-[22.5px] left-[106.02px] top-0 w-[6.516px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#fb2c36] text-[15px] top-[-2px] whitespace-nowrap">*</p>
    </div>
  );
}

function Label5() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <Icon12 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-[25px] not-italic text-[#020817] text-[15px] top-[-2px] whitespace-nowrap">Languages</p>
      <Text8 />
    </div>
  );
}

function Text9() {
  return (
    <div className="absolute content-stretch flex h-[21.422px] items-start left-[13px] top-[16.28px] w-[114.219px]" data-name="Text">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[21.429px] not-italic relative shrink-0 text-[#64748b] text-[15px] whitespace-nowrap">Select languages</p>
    </div>
  );
}

function Icon13() {
  return (
    <div className="absolute left-[358px] size-[16px] top-[19px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-[#f8fbff] h-[54px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Text9 />
      <Icon13 />
    </div>
  );
}

function Container18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] h-[96.5px] items-start left-0 top-0 w-[387px]" data-name="Container">
      <Label5 />
      <Button3 />
    </div>
  );
}

function Icon14() {
  return (
    <div className="absolute left-0 size-[17px] top-[2.75px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Icon">
          <path d={svgPaths.p1a2a9d80} id="Vector" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d={svgPaths.p2ec70180} id="Vector_2" stroke="var(--stroke-0, #043570)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
        </g>
      </svg>
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute h-[22.5px] left-[82.75px] top-0 w-[6.516px]" data-name="Text">
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-0 not-italic text-[#fb2c36] text-[15px] top-[-2px] whitespace-nowrap">*</p>
    </div>
  );
}

function Label6() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-full" data-name="Label">
      <Icon14 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-[25px] not-italic text-[#020817] text-[15px] top-[-2px] whitespace-nowrap">Gender</p>
      <Text10 />
    </div>
  );
}

function Text11() {
  return (
    <div className="h-[22.5px] relative shrink-0 w-[92.938px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[22.5px] not-italic relative shrink-0 text-[#64748b] text-[15px] text-center whitespace-nowrap">Select gender</p>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon" opacity="0.5">
          <path d="M4 6L8 10L12 6" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-[#f8fbff] h-[54px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[17px] py-[9px] relative size-full">
          <Text11 />
          <Icon15 />
        </div>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] h-[96.5px] items-start left-[411px] top-0 w-[387px]" data-name="Container">
      <Label6 />
      <Button4 />
    </div>
  );
}

function Container17() {
  return (
    <div className="absolute h-[96.5px] left-0 top-[458px] w-[798px]" data-name="Container">
      <Container18 />
      <Container19 />
    </div>
  );
}

function Icon16() {
  return (
    <div className="absolute left-0 size-[17px] top-[6.5px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 17">
        <g id="Icon">
          <path d={svgPaths.p34703600} id="Vector" stroke="var(--stroke-0, #0077B5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d={svgPaths.p3b738300} id="Vector_2" stroke="var(--stroke-0, #0077B5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
          <path d={svgPaths.p268b9200} id="Vector_3" stroke="var(--stroke-0, #0077B5)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.41667" />
        </g>
      </svg>
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute bg-[#f8fbff] content-stretch flex h-[30px] items-start left-[178.09px] px-[13px] py-[7px] rounded-[12px] top-0 w-[75.75px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[#64748b] text-[12px] tracking-[0.3px] whitespace-nowrap">Optional</p>
    </div>
  );
}

function Label7() {
  return (
    <div className="h-[30px] relative shrink-0 w-full" data-name="Label">
      <Icon16 />
      <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[22.5px] left-[25px] not-italic text-[#020817] text-[15px] top-[1.75px] whitespace-nowrap">LinkedIn Profile URL</p>
      <Text12 />
    </div>
  );
}

function Input5() {
  return (
    <div className="bg-[#f8fbff] h-[54px] relative rounded-[16px] shrink-0 w-full" data-name="Input">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center px-[16px] py-[4px] relative size-full">
          <p className="font-['Inter:Medium',sans-serif] font-medium leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[14px] whitespace-nowrap">{`https://www.linkedin.com/in/username`}</p>
        </div>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e5e7eb] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]" />
    </div>
  );
}

function Container20() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[10px] h-[94px] items-start left-0 top-[582.5px] w-[798px]" data-name="Container">
      <Label7 />
      <Input5 />
    </div>
  );
}

function Icon17() {
  return (
    <div className="absolute left-[145.58px] size-[16px] top-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d="M6 12L10 8L6 4" id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="bg-[#043570] h-[56px] relative rounded-[16px] shrink-0 w-[173.578px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Bold',sans-serif] font-bold leading-[22.5px] left-[71.5px] not-italic text-[15px] text-center text-white top-[14.75px] whitespace-nowrap">{`Save & Continue`}</p>
        <Icon17 />
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="absolute content-stretch flex h-[89px] items-start justify-end left-0 pt-[33px] top-[708.5px] w-[798px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#f3f4f6] border-solid border-t inset-0 pointer-events-none" />
      <Button5 />
    </div>
  );
}

function Form() {
  return (
    <div className="h-[797.5px] relative shrink-0 w-full" data-name="Form">
      <Container4 />
      <Container5 />
      <Container8 />
      <Container12 />
      <Container17 />
      <Container20 />
      <Container21 />
    </div>
  );
}

function BasicInformation() {
  return (
    <div className="bg-white flex-[864_0_0] h-[960px] min-h-px min-w-px relative rounded-[16px]" data-name="BasicInformation">
      <div aria-hidden="true" className="absolute border border-[#f3f4f6] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_20px_25px_0px_rgba(0,0,0,0.1),0px_8px_10px_0px_rgba(0,0,0,0.1)]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[32px] items-start pb-px pt-[33px] px-[33px] relative size-full">
        <Container1 />
        <Form />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="h-[1024px] relative shrink-0 w-full" data-name="Container">
      <div className="content-stretch flex gap-[32px] items-start p-[32px] relative size-full">
        <Sidebar />
        <BasicInformation />
      </div>
    </div>
  );
}

function OnboardingLayout() {
  return (
    <div className="bg-[#f8fafc] h-[1089px] relative shrink-0 w-full" data-name="OnboardingLayout">
      <div className="content-stretch flex flex-col items-start pt-[65px] px-[128px] relative size-full">
        <Container />
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="absolute content-stretch flex flex-col h-[896px] items-start left-0 top-0 w-[1536px]" data-name="Body">
      <OnboardingLayout />
    </div>
  );
}

function Icon18() {
  return (
    <div className="absolute left-0 size-[16px] top-[2px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p203476e0} id="Vector" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M12.6667 8H3.33333" id="Vector_2" stroke="var(--stroke-0, #00C0FF)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[75.672px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Icon18 />
        <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[20px] left-[50px] not-italic text-[#00c0ff] text-[14px] text-center top-[-1px] whitespace-nowrap">Go Back</p>
      </div>
    </div>
  );
}

function Icon19() {
  return (
    <div className="h-[16px] overflow-clip relative shrink-0 w-full" data-name="Icon">
      <div className="absolute inset-[8.33%_12.5%_66.67%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
            <path d={svgPaths.p36446d40} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[37.5%_62.5%_37.5%_12.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
            <path d={svgPaths.p36446d40} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[66.67%_12.5%_8.33%_62.5%]" data-name="Vector">
        <div className="absolute inset-[-16.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.33333 5.33333">
            <path d={svgPaths.p36446d40} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[56.29%_35.75%_27.12%_35.79%]" data-name="Vector">
        <div className="absolute inset-[-25.13%_-14.64%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.88688 3.98688">
            <path d={svgPaths.p3e007700} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
      <div className="absolute inset-[27.13%_35.79%_56.29%_35.79%]" data-name="Vector">
        <div className="absolute inset-[-25.13%_-14.67%]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.88022 3.98688">
            <path d={svgPaths.p309e7540} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Button7() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Icon19 />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Button6 />
      <Button7 />
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex h-[32px] items-start relative shrink-0 w-full" data-name="Heading 2">
      <p className="flex-[1_0_0] font-['Inter:Bold',sans-serif] font-bold leading-[32px] min-h-px min-w-px not-italic relative text-[#020817] text-[24px]">Step 1</p>
    </div>
  );
}

function Container24() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[76px] items-start relative shrink-0 w-full" data-name="Container">
      <Heading1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal h-[40px] leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] w-full">Enter your personal information to get closer to clients.</p>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[5.641px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">1</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="bg-[#043570] relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[13.172px] pr-[13.188px] relative size-full">
        <Text13 />
      </div>
    </div>
  );
}

function Container27() {
  return (
    <div className="flex-[200_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#043570] text-[16px] top-[-2px] whitespace-nowrap">Basic Information</p>
      </div>
    </div>
  );
}

function Button8() {
  return (
    <div className="bg-gradient-to-r from-[#f3faff] h-[58px] relative rounded-[16px] shrink-0 to-[rgba(243,250,255,0.5)] w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[rgba(0,192,255,0.3)] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <div className="content-stretch flex gap-[12px] items-start p-[13px] relative size-full">
        <Container26 />
        <Container27 />
      </div>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[7.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap">2</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="bg-[#e5e7eb] relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12.109px] relative size-full">
        <Text14 />
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="flex-[202_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#020817] text-[16px] top-[-2px] whitespace-nowrap">Description</p>
      </div>
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[56px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="content-stretch flex gap-[12px] items-start p-[12px] relative size-full">
        <Container28 />
        <Container29 />
      </div>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[20px] relative shrink-0 w-[7.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap">3</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="bg-[#e5e7eb] relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12.109px] relative size-full">
        <Text15 />
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="flex-[202_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#020817] text-[16px] top-[-2px] whitespace-nowrap">Profile Picture</p>
      </div>
    </div>
  );
}

function Button10() {
  return (
    <div className="h-[56px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="content-stretch flex gap-[12px] items-start p-[12px] relative size-full">
        <Container30 />
        <Container31 />
      </div>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[20px] relative shrink-0 w-[8.078px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap">4</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="bg-[#e5e7eb] relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center pl-[11.953px] pr-[11.969px] relative size-full">
        <Text16 />
      </div>
    </div>
  );
}

function Container33() {
  return (
    <div className="flex-[202_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#020817] text-[16px] top-[-2px] whitespace-nowrap">Videos (Optional)</p>
      </div>
    </div>
  );
}

function Button11() {
  return (
    <div className="h-[56px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="content-stretch flex gap-[12px] items-start p-[12px] relative size-full">
        <Container32 />
        <Container33 />
      </div>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[20px] relative shrink-0 w-[7.781px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#6a7282] text-[14px] text-center whitespace-nowrap">5</p>
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="bg-[#e5e7eb] relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center px-[12.109px] relative size-full">
        <Text17 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="flex-[202_0_0] h-[24px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-0 not-italic text-[#020817] text-[16px] top-[-2px] whitespace-nowrap">Availability</p>
      </div>
    </div>
  );
}

function Button12() {
  return (
    <div className="h-[56px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="content-stretch flex gap-[12px] items-start p-[12px] relative size-full">
        <Container34 />
        <Container35 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex flex-col gap-[12px] h-[330px] items-start relative shrink-0 w-full" data-name="Container">
      <Button8 />
      <Button9 />
      <Button10 />
      <Button11 />
      <Button12 />
    </div>
  );
}

function Container22() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[24px] h-[474px] items-start left-[24px] top-[24px] w-[270px]" data-name="Container">
      <Container23 />
      <Container24 />
      <Container25 />
    </div>
  );
}

function Icon20() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p38966ca0} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p14ca9100} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M17.5 10H7.5" id="Vector_3" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[24px] relative shrink-0 w-[51.688px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[24px] left-[26.5px] not-italic text-[16px] text-center text-white top-[-2px] whitespace-nowrap">Logout</p>
      </div>
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute bg-[#043570] content-stretch flex gap-[8px] h-[48px] items-center justify-center left-[24px] px-[95.156px] py-[12px] rounded-[16px] top-[664px] w-[270px]" data-name="Button">
      <Icon20 />
      <Text18 />
    </div>
  );
}

function Button14() {
  return (
    <div className="absolute h-[18px] left-[24px] top-[724px] w-[270px]" data-name="Button">
      <p className="-translate-x-1/2 absolute font-['Inter:Medium',sans-serif] font-medium leading-[18px] left-[135.09px] not-italic text-[#64748b] text-[12px] text-center top-0 whitespace-nowrap">Contact Support</p>
    </div>
  );
}

function OnboardingLayout1() {
  return (
    <div className="absolute bg-white border border-[#e5e7eb] border-solid h-[768px] left-[160px] rounded-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-[97px] w-[320px]" data-name="OnboardingLayout">
      <Container22 />
      <Button13 />
      <Button14 />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-[12.39%_56.61%_12.3%_27.17%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24.3969 24.0986">
        <g id="Group">
          <path d={svgPaths.p185406c0} fill="var(--fill-0, #043570)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="absolute inset-[30.7%_43.62%_11.21%_46%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.6091 18.5889">
        <g id="Group">
          <path d={svgPaths.p34d04800} fill="var(--fill-0, #043570)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group3() {
  return (
    <div className="absolute inset-[30.7%_31.26%_12.3%_58.73%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.0458 18.2406">
        <g id="Group">
          <path d={svgPaths.p25c32c00} fill="var(--fill-0, #043570)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group4() {
  return (
    <div className="absolute inset-[18.13%_22.78%_11.21%_70.47%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.1627 22.6103">
        <g id="Group">
          <path d={svgPaths.p2f17cf00} fill="var(--fill-0, #043570)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group5() {
  return (
    <div className="absolute inset-[30.7%_14.51%_12.3%_79.24%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 9.40111 18.2406">
        <g id="Group">
          <path d={svgPaths.p3bc5b170} fill="var(--fill-0, #043570)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group6() {
  return (
    <div className="absolute inset-[30.7%_2.97%_11.21%_86.66%]" data-name="Group">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.6091 18.5889">
        <g id="Group">
          <path d={svgPaths.p34d04800} fill="var(--fill-0, #043570)" id="Vector" />
        </g>
      </svg>
    </div>
  );
}

function Group() {
  return (
    <div className="absolute contents inset-[12.39%_2.97%_11.21%_27.17%]" data-name="Group">
      <Group1 />
      <Group2 />
      <Group3 />
      <Group4 />
      <Group5 />
      <Group6 />
    </div>
  );
}

function Icon21() {
  return (
    <div className="h-[32px] relative shrink-0 w-[150.391px]" data-name="Icon">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid overflow-clip relative rounded-[inherit] size-full">
        <div className="absolute inset-[4.73%_75.34%_11.57%_1.83%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 34.3273 26.7821">
            <path d={svgPaths.p2f8efa00} fill="var(--fill-0, #00C0FF)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[39.58%_78.97%_1.06%_6.38%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22.0311 18.9926">
            <path d={svgPaths.pd036580} fill="var(--fill-0, #043570)" id="Vector" />
          </svg>
        </div>
        <div className="absolute inset-[43.72%_81.91%_40.36%_14.7%]" data-name="Vector">
          <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 5.09428 5.09428">
            <path d={svgPaths.p2437b350} fill="var(--fill-0, #043570)" id="Vector" />
          </svg>
        </div>
        <Group />
      </div>
    </div>
  );
}

function Container37() {
  return (
    <div className="h-[32px] relative shrink-0 w-[150.391px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Icon21 />
      </div>
    </div>
  );
}

function Icon22() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="Icon">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g clipPath="url(#clip0_4350_792)" id="Icon">
          <path d={svgPaths.p1a356800} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p5fcf400} id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M1.33333 3.33333H9.33333" id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M4.66667 1.33333H5.33333" id="Vector_4" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d={svgPaths.p1bfa36c0} id="Vector_5" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M9.33333 12H13.3333" id="Vector_6" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
        <defs>
          <clipPath id="clip0_4350_792">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text19() {
  return (
    <div className="flex-[1_0_0] h-[20px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">English</p>
      </div>
    </div>
  );
}

function Button15() {
  return (
    <div className="h-[20px] relative shrink-0 w-[69.359px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Icon22 />
        <Text19 />
      </div>
    </div>
  );
}

function Container36() {
  return (
    <div className="h-[64px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between px-[32px] py-[16px] relative size-full">
          <Container37 />
          <Button15 />
        </div>
      </div>
    </div>
  );
}

function OnboardingLayout2() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[65px] items-start left-0 pb-px px-[128px] top-0 w-[1536px]" data-name="OnboardingLayout">
      <div aria-hidden="true" className="absolute border-[#e5e7eb] border-b border-solid inset-0 pointer-events-none shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Container36 />
    </div>
  );
}

export default function RedesignProviderLoginForm() {
  return (
    <div className="bg-[#f8fafc] relative size-full" data-name="Redesign Provider Login Form">
      <Body />
      <OnboardingLayout1 />
      <OnboardingLayout2 />
    </div>
  );
}