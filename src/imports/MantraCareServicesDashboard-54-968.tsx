import svgPaths from "./svg-ynhyyu82yv";
import imgImageWithFallback from "figma:asset/6a1ecf9cbacd7b10f4f5376555a0a49757a43d59.png";
import imgImageWithFallback1 from "figma:asset/7579eed6f4dcdb107827ab7fb4cdfcb323906d2d.png";
import imgImageWithFallback2 from "figma:asset/679e9836b4f1591ddd439c69415714ce34a3dac6.png";
import imgImageWithFallback3 from "figma:asset/f73ec4325655e39e869b83c13a845fee29b5a017.png";
import imgImageWithFallback4 from "figma:asset/cd09f74929e7b366f62ea11ed260a429ff8ba485.png";
import imgImageWithFallback5 from "figma:asset/7d9d0c9536bdb83bedb045e9c26ab151d842cab1.png";

function Icon() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pc663880} id="Vector" stroke="var(--stroke-0, #1E293B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Container5() {
  return (
    <div className="bg-[#f1f5f9] relative rounded-[10px] shrink-0 size-[40px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon />
      </div>
    </div>
  );
}

function Heading() {
  return (
    <div className="flex-[1_0_0] h-[32px] min-h-px min-w-px relative" data-name="Heading 1">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[32px] not-italic relative shrink-0 text-[#0f172b] text-[24px] whitespace-nowrap">Care Team</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="h-[40px] relative shrink-0 w-[164.906px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[12px] items-center relative size-full">
        <Container5 />
        <Heading />
      </div>
    </div>
  );
}

function Icon1() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3f4e600} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p2aca4e80} id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p10b1cef0} id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon1 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container4 />
      <Button />
    </div>
  );
}

function TextInput() {
  return (
    <div className="absolute bg-[#f3faff] h-[38px] left-0 rounded-[12px] top-0 w-[447px]" data-name="Text Input">
      <div className="content-stretch flex items-center overflow-clip pl-[36px] pr-[12px] py-[8px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[normal] not-italic relative shrink-0 text-[#64748b] text-[14px] whitespace-nowrap">Search conversations...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2ecf5] border-solid inset-0 pointer-events-none rounded-[12px]" />
    </div>
  );
}

function Icon2() {
  return (
    <div className="absolute left-[12px] size-[16px] top-[11px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Icon">
          <path d={svgPaths.p107a080} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
          <path d="M14 14L11.1333 11.1333" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[38px] relative shrink-0 w-full" data-name="Container">
      <TextInput />
      <Icon2 />
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[123px] relative shrink-0 w-[479px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2ecf5] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[12px] items-start pb-px pt-[16px] px-[16px] relative size-full">
        <Container3 />
        <Container6 />
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="h-[16px] relative shrink-0 w-full" data-name="Heading 3">
      <div className="content-stretch flex items-start px-[8px] relative size-full">
        <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] min-h-px min-w-px not-italic relative text-[#64748b] text-[12px] tracking-[0.3px] uppercase">Care Team</p>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="h-[20px] relative shrink-0 w-[157.766px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#020817] text-[0px] whitespace-nowrap">
          <span className="leading-[20px] text-[14px]">{`Mantra AI `}</span>
          <span className="leading-[16px] text-[#64748b] text-[12px]">(Care Counselor)</span>
        </p>
      </div>
    </div>
  );
}

function Text() {
  return (
    <div className="h-[15px] relative shrink-0 w-[47.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#64748b] text-[10px] whitespace-nowrap">2 days ago</p>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading2 />
      <Text />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex h-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#64748b] text-[12px]">How are you feeling today? Ready for our session?</p>
    </div>
  );
}

function CareTeam1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[38px] items-start left-[70px] overflow-clip top-[14px] w-[371px]" data-name="CareTeam">
      <Container9 />
      <Paragraph />
    </div>
  );
}

function ImageWithFallback() {
  return (
    <div className="absolute left-0 rounded-[33554400px] size-[44px] top-0" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container10() {
  return <div className="absolute bg-[#10b981] border-2 border-solid border-white left-[32px] rounded-[33554400px] size-[12px] top-[32px]" data-name="Container" />;
}

function CareTeam2() {
  return (
    <div className="absolute left-[14px] size-[44px] top-[14px]" data-name="CareTeam">
      <ImageWithFallback />
      <Container10 />
    </div>
  );
}

function Button1() {
  return (
    <div className="bg-[#f3faff] h-[72px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[#00c0ff] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <CareTeam1 />
      <CareTeam2 />
    </div>
  );
}

function Heading3() {
  return (
    <div className="h-[20px] relative shrink-0 w-[177.922px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[0] not-italic relative shrink-0 text-[#020817] text-[0px] whitespace-nowrap">
          <span className="leading-[20px] text-[14px]">{`Dr. Michael Brown `}</span>
          <span className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] text-[#043570] text-[12px]">(Therapist)</span>
        </p>
      </div>
    </div>
  );
}

function Text1() {
  return (
    <div className="h-[15px] relative shrink-0 w-[41.906px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#64748b] text-[10px] whitespace-nowrap">10:45 AM</p>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading3 />
      <Text1 />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="content-stretch flex h-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#043570] text-[12px] whitespace-nowrap">{`That's great progress! Keep up with the breathing exercises.`}</p>
    </div>
  );
}

function CareTeam3() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[38px] items-start left-[70px] overflow-clip top-[14px] w-[351px]" data-name="CareTeam">
      <Container11 />
      <Paragraph1 />
    </div>
  );
}

function CareTeam4() {
  return <div className="absolute bg-[#00c0ff] left-[433px] rounded-[33554400px] size-[8px] top-[20px]" data-name="CareTeam" />;
}

function ImageWithFallback1() {
  return (
    <div className="absolute left-0 rounded-[33554400px] size-[44px] top-0" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImageWithFallback1} />
    </div>
  );
}

function Container12() {
  return <div className="absolute bg-[#10b981] border-2 border-solid border-white left-[32px] rounded-[33554400px] size-[12px] top-[32px]" data-name="Container" />;
}

function CareTeam5() {
  return (
    <div className="absolute left-[14px] size-[44px] top-[14px]" data-name="CareTeam">
      <ImageWithFallback1 />
      <Container12 />
    </div>
  );
}

function Button2() {
  return (
    <div className="bg-[#f3faff] h-[72px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <CareTeam3 />
      <CareTeam4 />
      <CareTeam5 />
    </div>
  );
}

function Heading4() {
  return (
    <div className="h-[20px] relative shrink-0 w-[192.281px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#020817] text-[0px] whitespace-nowrap">
          <span className="leading-[20px] text-[14px]">{`Dr. Emily White `}</span>
          <span className="leading-[16px] text-[#64748b] text-[12px]">(Medical Doctor)</span>
        </p>
      </div>
    </div>
  );
}

function Text2() {
  return (
    <div className="h-[15px] relative shrink-0 w-[47.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#64748b] text-[10px] whitespace-nowrap">4 days ago</p>
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading4 />
      <Text2 />
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex h-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#64748b] text-[12px]">{`Your lab results look good. Let's discuss them.`}</p>
    </div>
  );
}

function CareTeam6() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[38px] items-start left-[70px] overflow-clip top-[14px] w-[371px]" data-name="CareTeam">
      <Container13 />
      <Paragraph2 />
    </div>
  );
}

function ImageWithFallback2() {
  return (
    <div className="absolute left-0 rounded-[33554400px] size-[44px] top-0" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImageWithFallback2} />
    </div>
  );
}

function Container14() {
  return <div className="absolute bg-[#64748b] border-2 border-solid border-white left-[32px] rounded-[33554400px] size-[12px] top-[32px]" data-name="Container" />;
}

function CareTeam7() {
  return (
    <div className="absolute left-[14px] size-[44px] top-[14px]" data-name="CareTeam">
      <ImageWithFallback2 />
      <Container14 />
    </div>
  );
}

function Button3() {
  return (
    <div className="h-[72px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <CareTeam6 />
      <CareTeam7 />
    </div>
  );
}

function Heading5() {
  return (
    <div className="h-[20px] relative shrink-0 w-[211.063px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#020817] text-[0px] whitespace-nowrap">
          <span className="leading-[20px] text-[14px]">{`Coach Alex Turner `}</span>
          <span className="leading-[16px] text-[#64748b] text-[12px]">(Wellness Coach)</span>
        </p>
      </div>
    </div>
  );
}

function Text3() {
  return (
    <div className="h-[15px] relative shrink-0 w-[42.031px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#64748b] text-[10px] whitespace-nowrap">Yesterday</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading5 />
      <Text3 />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="content-stretch flex h-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#64748b] text-[12px]">{`I've created a customized meal plan for you. Check it out!`}</p>
    </div>
  );
}

function CareTeam8() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[38px] items-start left-[70px] overflow-clip top-[14px] w-[371px]" data-name="CareTeam">
      <Container15 />
      <Paragraph3 />
    </div>
  );
}

function ImageWithFallback3() {
  return (
    <div className="absolute left-0 rounded-[33554400px] size-[44px] top-0" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImageWithFallback3} />
    </div>
  );
}

function Container16() {
  return <div className="absolute bg-[#10b981] border-2 border-solid border-white left-[32px] rounded-[33554400px] size-[12px] top-[32px]" data-name="Container" />;
}

function CareTeam9() {
  return (
    <div className="absolute left-[14px] size-[44px] top-[14px]" data-name="CareTeam">
      <ImageWithFallback3 />
      <Container16 />
    </div>
  );
}

function Button4() {
  return (
    <div className="h-[72px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <CareTeam8 />
      <CareTeam9 />
    </div>
  );
}

function Heading6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[172.828px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#020817] text-[0px] whitespace-nowrap">
          <span className="leading-[20px] text-[14px]">{`Dr. Rachel Green `}</span>
          <span className="leading-[16px] text-[#64748b] text-[12px]">(Sexologist)</span>
        </p>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[20px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between pr-[198.172px] relative size-full">
          <Heading6 />
        </div>
      </div>
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="h-[16px] relative shrink-0 w-[60.813px]" data-name="Paragraph">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[16px] not-italic relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap">Get started</p>
      </div>
    </div>
  );
}

function Icon3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 14 14">
        <g id="Icon">
          <path d="M5.25 10.5L8.75 7L5.25 3.5" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.16667" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex h-[16px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Paragraph4 />
      <Icon3 />
    </div>
  );
}

function CareTeam10() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[38px] items-start left-[70px] overflow-clip top-[14px] w-[371px]" data-name="CareTeam">
      <Container17 />
      <Container18 />
    </div>
  );
}

function ImageWithFallback4() {
  return (
    <div className="absolute left-0 rounded-[33554400px] size-[44px] top-0" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImageWithFallback4} />
    </div>
  );
}

function Container19() {
  return <div className="absolute bg-[#64748b] border-2 border-solid border-white left-[32px] rounded-[33554400px] size-[12px] top-[32px]" data-name="Container" />;
}

function CareTeam11() {
  return (
    <div className="absolute left-[14px] size-[44px] top-[14px]" data-name="CareTeam">
      <ImageWithFallback4 />
      <Container19 />
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[72px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <CareTeam10 />
      <CareTeam11 />
    </div>
  );
}

function Heading7() {
  return (
    <div className="h-[20px] relative shrink-0 w-[163.219px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#020817] text-[0px] whitespace-nowrap">
          <span className="leading-[20px] text-[14px]">{`Lisa Anderson `}</span>
          <span className="leading-[16px] text-[#64748b] text-[12px]">(Nutritionist)</span>
        </p>
      </div>
    </div>
  );
}

function Text4() {
  return (
    <div className="h-[15px] relative shrink-0 w-[47.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#64748b] text-[10px] whitespace-nowrap">3 days ago</p>
      </div>
    </div>
  );
}

function Container20() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading7 />
      <Text4 />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex h-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#64748b] text-[12px]">Remember to track your meals this week.</p>
    </div>
  );
}

function CareTeam12() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[38px] items-start left-[70px] overflow-clip top-[14px] w-[371px]" data-name="CareTeam">
      <Container20 />
      <Paragraph5 />
    </div>
  );
}

function ImageWithFallback5() {
  return (
    <div className="absolute left-0 rounded-[33554400px] size-[44px] top-0" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImageWithFallback5} />
    </div>
  );
}

function Container21() {
  return <div className="absolute bg-[#10b981] border-2 border-solid border-white left-[32px] rounded-[33554400px] size-[12px] top-[32px]" data-name="Container" />;
}

function CareTeam13() {
  return (
    <div className="absolute left-[14px] size-[44px] top-[14px]" data-name="CareTeam">
      <ImageWithFallback5 />
      <Container21 />
    </div>
  );
}

function Button6() {
  return (
    <div className="h-[72px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <CareTeam12 />
      <CareTeam13 />
    </div>
  );
}

function Heading8() {
  return (
    <div className="h-[20px] relative shrink-0 w-[51.359px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#020817] text-[14px] whitespace-nowrap">{`Therapy `}</p>
      </div>
    </div>
  );
}

function Icon4() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g clipPath="url(#clip0_54_315)" id="Icon">
          <path d={svgPaths.p3cf7650} id="Vector" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
          <path d="M5 6.66667V5" id="Vector_2" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
          <path d="M5 3.33333H5.00417" id="Vector_3" stroke="var(--stroke-0, #10B981)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.833333" />
        </g>
        <defs>
          <clipPath id="clip0_54_315">
            <rect fill="white" height="10" width="10" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text5() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#10b981] text-[10px] whitespace-nowrap">Finding the Right Provider</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="h-[15px] relative shrink-0 w-[131.422px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[2px] items-center relative size-full">
        <Icon4 />
        <Text5 />
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading8 />
      <Container23 />
    </div>
  );
}

function Paragraph6() {
  return (
    <div className="content-stretch flex h-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#64748b] text-[12px]">Overcome challenges with a professional therapist</p>
    </div>
  );
}

function CareTeam14() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[38px] items-start left-[70px] overflow-clip top-[14px] w-[371px]" data-name="CareTeam">
      <Container22 />
      <Paragraph6 />
    </div>
  );
}

function ImageWithFallback6() {
  return (
    <div className="absolute left-0 rounded-[33554400px] size-[44px] top-0" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImageWithFallback1} />
    </div>
  );
}

function Container24() {
  return <div className="absolute bg-[#64748b] border-2 border-solid border-white left-[32px] rounded-[33554400px] size-[12px] top-[32px]" data-name="Container" />;
}

function CareTeam15() {
  return (
    <div className="absolute left-[14px] size-[44px] top-[14px]" data-name="CareTeam">
      <ImageWithFallback6 />
      <Container24 />
    </div>
  );
}

function Button7() {
  return (
    <div className="h-[72px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <CareTeam14 />
      <CareTeam15 />
    </div>
  );
}

function Heading9() {
  return (
    <div className="h-[20px] relative shrink-0 w-[30.953px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#020817] text-[14px] whitespace-nowrap">{`Yoga `}</p>
      </div>
    </div>
  );
}

function Text6() {
  return (
    <div className="flex-[1_0_0] h-[15px] min-h-px min-w-px relative" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#00c0ff] text-[10px] whitespace-nowrap">{`Get Started >`}</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="h-[15px] relative shrink-0 w-[61.219px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Text6 />
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading9 />
      <Container26 />
    </div>
  );
}

function Paragraph7() {
  return (
    <div className="content-stretch flex h-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#64748b] text-[12px]">Practice mindfulness and balance with expert instructors</p>
    </div>
  );
}

function CareTeam16() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[38px] items-start left-[70px] overflow-clip top-[14px] w-[371px]" data-name="CareTeam">
      <Container25 />
      <Paragraph7 />
    </div>
  );
}

function ImageWithFallback7() {
  return (
    <div className="absolute left-0 rounded-[33554400px] size-[44px] top-0" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImageWithFallback1} />
    </div>
  );
}

function Container27() {
  return <div className="absolute bg-[#64748b] border-2 border-solid border-white left-[32px] rounded-[33554400px] size-[12px] top-[32px]" data-name="Container" />;
}

function CareTeam17() {
  return (
    <div className="absolute left-[14px] size-[44px] top-[14px]" data-name="CareTeam">
      <ImageWithFallback7 />
      <Container27 />
    </div>
  );
}

function Button8() {
  return (
    <div className="h-[72px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <CareTeam16 />
      <CareTeam17 />
    </div>
  );
}

function Heading10() {
  return (
    <div className="h-[20px] relative shrink-0 w-[192.281px]" data-name="Heading 4">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#020817] text-[0px] whitespace-nowrap">
          <span className="leading-[20px] text-[14px]">{`Dr. Emily White `}</span>
          <span className="leading-[16px] text-[#64748b] text-[12px]">(Medical Doctor)</span>
        </p>
      </div>
    </div>
  );
}

function Text7() {
  return (
    <div className="h-[15px] relative shrink-0 w-[47.766px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[15px] not-italic relative shrink-0 text-[#64748b] text-[10px] whitespace-nowrap">5 days ago</p>
      </div>
    </div>
  );
}

function Container28() {
  return (
    <div className="content-stretch flex h-[20px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Heading10 />
      <Text7 />
    </div>
  );
}

function Paragraph8() {
  return (
    <div className="content-stretch flex h-[16px] items-start overflow-clip relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#64748b] text-[12px]">{`Your lab results look good. Let's discuss them.`}</p>
    </div>
  );
}

function Icon5() {
  return (
    <div className="relative shrink-0 size-[12px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 12 12">
        <g clipPath="url(#clip0_54_346)" id="Icon">
          <path d={svgPaths.p3e7757b0} id="Vector" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 4V6" id="Vector_2" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6 8H6.005" id="Vector_3" stroke="var(--stroke-0, #EF4444)" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_54_346">
            <rect fill="white" height="12" width="12" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text8() {
  return (
    <div className="h-[15px] relative shrink-0 w-[64.172px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[15px] not-italic relative shrink-0 text-[#ef4444] text-[10px] whitespace-nowrap">Inactive Order</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex gap-[4px] h-[15px] items-center relative shrink-0 w-full" data-name="Container">
      <Icon5 />
      <Text8 />
    </div>
  );
}

function Container29() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[35px] items-start relative shrink-0 w-full" data-name="Container">
      <Paragraph8 />
      <Container30 />
    </div>
  );
}

function CareTeam18() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[57px] items-start left-[70px] overflow-clip top-[14px] w-[371px]" data-name="CareTeam">
      <Container28 />
      <Container29 />
    </div>
  );
}

function ImageWithFallback8() {
  return (
    <div className="absolute left-0 rounded-[33554400px] size-[44px] top-0" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImageWithFallback2} />
    </div>
  );
}

function Container31() {
  return <div className="absolute bg-[#64748b] border-2 border-solid border-white left-[32px] rounded-[33554400px] size-[12px] top-[32px]" data-name="Container" />;
}

function CareTeam19() {
  return (
    <div className="absolute left-[14px] size-[44px] top-[14px]" data-name="CareTeam">
      <ImageWithFallback8 />
      <Container31 />
    </div>
  );
}

function Button9() {
  return (
    <div className="h-[85px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div aria-hidden="true" className="absolute border-2 border-[rgba(0,0,0,0)] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <CareTeam18 />
      <CareTeam19 />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[693px] items-start relative shrink-0 w-full" data-name="Container">
      <Button1 />
      <Button2 />
      <Button3 />
      <Button4 />
      <Button5 />
      <Button6 />
      <Button7 />
      <Button8 />
      <Button9 />
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[479px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start pt-[12px] px-[12px] relative size-full">
          <Heading1 />
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="bg-white h-[864px] relative shrink-0 w-[480px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2ecf5] border-r border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pr-px relative size-full">
        <Container2 />
        <Container7 />
      </div>
    </div>
  );
}

function Heading11() {
  return (
    <div className="content-stretch flex h-[20px] items-start relative shrink-0 w-full" data-name="Heading 3">
      <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[#020817] text-[14px] text-center whitespace-nowrap">Mantra AI</p>
    </div>
  );
}

function Paragraph9() {
  return (
    <div className="content-stretch flex h-[16px] items-start relative shrink-0 w-full" data-name="Paragraph">
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[16px] min-h-px min-w-px not-italic relative text-[#64748b] text-[12px] text-center">Online</p>
    </div>
  );
}

function Container36() {
  return (
    <div className="absolute content-stretch flex flex-col h-[36px] items-start left-[52px] top-[2px] w-[63.297px]" data-name="Container">
      <Heading11 />
      <Paragraph9 />
    </div>
  );
}

function ImageWithFallback9() {
  return (
    <div className="absolute left-0 rounded-[33554400px] size-[40px] top-0" data-name="ImageWithFallback">
      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Container38() {
  return <div className="absolute bg-[#10b981] border-2 border-solid border-white left-[28px] rounded-[33554400px] size-[12px] top-[28px]" data-name="Container" />;
}

function Container37() {
  return (
    <div className="absolute left-0 size-[40px] top-0" data-name="Container">
      <ImageWithFallback9 />
      <Container38 />
    </div>
  );
}

function Button10() {
  return (
    <div className="flex-[1_0_0] h-[40px] min-h-px min-w-px relative" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container36 />
        <Container37 />
      </div>
    </div>
  );
}

function Container35() {
  return (
    <div className="h-[40px] relative shrink-0 w-[115.297px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center relative size-full">
        <Button10 />
      </div>
    </div>
  );
}

function Icon6() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M6 1.5V4.5" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M12 1.5V4.5" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p13693a10} id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M2.25 7.5H15.75" id="Vector_4" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button11() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[36px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon6 />
      </div>
    </div>
  );
}

function Icon7() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d={svgPaths.p3f4e600} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p2aca4e80} id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p10b1cef0} id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button12() {
  return (
    <div className="flex-[1_0_0] h-[36px] min-h-px min-w-px relative rounded-[12px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon7 />
      </div>
    </div>
  );
}

function Container39() {
  return (
    <div className="h-[36px] relative shrink-0 w-[80px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center relative size-full">
        <Button11 />
        <Button12 />
      </div>
    </div>
  );
}

function Container34() {
  return (
    <div className="content-stretch flex h-[40px] items-center justify-between relative shrink-0 w-full" data-name="Container">
      <Container35 />
      <Container39 />
    </div>
  );
}

function Container33() {
  return (
    <div className="bg-white h-[73px] relative shrink-0 w-[800px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2ecf5] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-px pt-[16px] px-[24px] relative size-full">
        <Container34 />
      </div>
    </div>
  );
}

function Text9() {
  return (
    <div className="bg-white h-[26px] relative rounded-[33554400px] shrink-0 w-[57.125px]" data-name="Text">
      <div aria-hidden="true" className="absolute border border-[#e2ecf5] border-solid inset-0 pointer-events-none rounded-[33554400px]" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start px-[13px] py-[5px] relative size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap">Today</p>
      </div>
    </div>
  );
}

function Container42() {
  return (
    <div className="content-stretch flex h-[26px] items-center justify-center relative shrink-0 w-full" data-name="Container">
      <Text9 />
    </div>
  );
}

function ImageWithFallback10() {
  return (
    <div className="relative rounded-[33554400px] shrink-0 size-[32px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Paragraph10() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#020817] text-[14px] top-[-1px] w-[399px]">Hello! How can I help you today? Feel free to share any concerns or questions you have.</p>
    </div>
  );
}

function Container46() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[66px] items-start left-0 pb-px pt-[13px] px-[17px] rounded-bl-[16px] rounded-br-[16px] rounded-tl-[8px] rounded-tr-[16px] top-0 w-[448px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2ecf5] border-solid inset-0 pointer-events-none rounded-bl-[16px] rounded-br-[16px] rounded-tl-[8px] rounded-tr-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Paragraph10 />
    </div>
  );
}

function Text10() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[4px] top-[70px] w-[704px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#64748b] text-[12px]">10:30 AM</p>
    </div>
  );
}

function Container45() {
  return (
    <div className="flex-[1_0_0] h-[86px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container46 />
        <Text10 />
      </div>
    </div>
  );
}

function Container44() {
  return (
    <div className="content-stretch flex gap-[12px] h-[86px] items-start relative shrink-0 w-full" data-name="Container">
      <ImageWithFallback10 />
      <Container45 />
    </div>
  );
}

function Paragraph11() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[14px] text-white top-[-1px] w-[413px]">{`Hi! I've been following the program for a week now and I'm feeling great. Thanks for all your support!`}</p>
    </div>
  );
}

function Container49() {
  return (
    <div className="absolute bg-[#043570] content-stretch flex flex-col h-[64px] items-start left-[260px] pt-[12px] px-[16px] rounded-bl-[16px] rounded-br-[16px] rounded-tl-[16px] rounded-tr-[8px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)] top-0 w-[448px]" data-name="Container">
      <Paragraph11 />
    </div>
  );
}

function Text11() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[653.72px] top-[68px] w-[50.281px]" data-name="Text">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[16px] not-italic relative shrink-0 text-[#64748b] text-[12px] whitespace-nowrap">10:32 AM</p>
    </div>
  );
}

function Container48() {
  return (
    <div className="flex-[1_0_0] h-[84px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container49 />
        <Text11 />
      </div>
    </div>
  );
}

function Container50() {
  return (
    <div className="bg-gradient-to-b from-[#7c3aed] relative rounded-[33554400px] shrink-0 size-[32px] to-[#6d28d9]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[16px] not-italic relative shrink-0 text-[12px] text-white whitespace-nowrap">U</p>
      </div>
    </div>
  );
}

function Container47() {
  return (
    <div className="content-stretch flex gap-[12px] h-[84px] items-start justify-end relative shrink-0 w-full" data-name="Container">
      <Container48 />
      <Container50 />
    </div>
  );
}

function ImageWithFallback11() {
  return (
    <div className="relative rounded-[33554400px] shrink-0 size-[32px]" data-name="ImageWithFallback">
      <img alt="" className="absolute bg-clip-padding border-0 border-[transparent] border-solid inset-0 max-w-none object-cover pointer-events-none rounded-[33554400px] size-full" src={imgImageWithFallback} />
    </div>
  );
}

function Paragraph12() {
  return (
    <div className="h-[40px] relative shrink-0 w-full" data-name="Paragraph">
      <p className="absolute font-['Inter:Regular',sans-serif] font-normal leading-[20px] left-0 not-italic text-[#020817] text-[14px] top-[-1px] w-[394px]">{`That's wonderful to hear! Keep up the great work. Remember to stay consistent with your daily activities.`}</p>
    </div>
  );
}

function Container53() {
  return (
    <div className="absolute bg-white content-stretch flex flex-col h-[66px] items-start left-0 pb-px pt-[13px] px-[17px] rounded-bl-[16px] rounded-br-[16px] rounded-tl-[8px] rounded-tr-[16px] top-0 w-[448px]" data-name="Container">
      <div aria-hidden="true" className="absolute border border-[#e2ecf5] border-solid inset-0 pointer-events-none rounded-bl-[16px] rounded-br-[16px] rounded-tl-[8px] rounded-tr-[16px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_0px_rgba(0,0,0,0.1)]" />
      <Paragraph12 />
    </div>
  );
}

function Text12() {
  return (
    <div className="absolute content-stretch flex h-[16px] items-start left-[4px] top-[70px] w-[704px]" data-name="Text">
      <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[16px] min-h-px min-w-px not-italic relative text-[#64748b] text-[12px]">10:35 AM</p>
    </div>
  );
}

function Container52() {
  return (
    <div className="flex-[1_0_0] h-[86px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container53 />
        <Text12 />
      </div>
    </div>
  );
}

function Container51() {
  return (
    <div className="content-stretch flex gap-[12px] h-[86px] items-start relative shrink-0 w-full" data-name="Container">
      <ImageWithFallback11 />
      <Container52 />
    </div>
  );
}

function Container43() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] h-[288px] items-start relative shrink-0 w-full" data-name="Container">
      <Container44 />
      <Container47 />
      <Container51 />
    </div>
  );
}

function Container41() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-[338px] items-start relative shrink-0 w-full" data-name="Container">
      <Container42 />
      <Container43 />
    </div>
  );
}

function Container40() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[800px]" data-name="Container">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[24px] px-[24px] relative size-full">
          <Container41 />
        </div>
      </div>
    </div>
  );
}

function Icon8() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M11.0283 16.8767L17.5 10.25" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c8f9600} id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Button13() {
  return (
    <div className="absolute content-stretch flex items-center justify-center left-0 rounded-[12px] size-[40px] top-[12px]" data-name="Button">
      <Icon8 />
    </div>
  );
}

function Icon9() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g clipPath="url(#clip0_54_337)" id="Icon">
          <path d={svgPaths.p26c16f70} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d={svgPaths.p7fc5d00} id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
        <defs>
          <clipPath id="clip0_54_337">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Button14() {
  return (
    <div className="absolute bg-[#043570] content-stretch flex items-center justify-center left-[712px] opacity-50 rounded-[12px] size-[40px] top-[12px]" data-name="Button">
      <Icon9 />
    </div>
  );
}

function TextArea() {
  return (
    <div className="absolute bg-[#f3faff] h-[46px] left-[52px] rounded-[16px] top-0 w-[648px]" data-name="Text Area">
      <div className="content-stretch flex items-start overflow-clip px-[16px] py-[12px] relative rounded-[inherit] size-full">
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] whitespace-nowrap">Type your message...</p>
      </div>
      <div aria-hidden="true" className="absolute border border-[#e2ecf5] border-solid inset-0 pointer-events-none rounded-[16px]" />
    </div>
  );
}

function Container55() {
  return (
    <div className="h-[52px] relative shrink-0 w-full" data-name="Container">
      <Button13 />
      <Button14 />
      <TextArea />
    </div>
  );
}

function Container54() {
  return (
    <div className="bg-white h-[101px] relative shrink-0 w-[800px]" data-name="Container">
      <div aria-hidden="true" className="absolute border-[#e2ecf5] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[25px] px-[24px] relative size-full">
        <Container55 />
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="bg-[#fafbfc] flex-[1_0_0] h-[864px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <Container33 />
        <Container40 />
        <Container54 />
      </div>
    </div>
  );
}

function MainContent() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[1280px]" data-name="Main Content">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <Container1 />
        <Container32 />
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="flex-[1_0_0] h-[864px] min-h-px min-w-px relative" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <MainContent />
      </div>
    </div>
  );
}

function CareTeam() {
  return (
    <div className="bg-[#f9fafb] h-[864px] relative shrink-0 w-full" data-name="CareTeam">
      <div className="content-stretch flex items-start pl-[256px] relative size-full">
        <Container />
      </div>
    </div>
  );
}

function Body() {
  return (
    <div className="absolute bg-[#f6f8fb] content-stretch flex flex-col h-[862px] items-start left-0 top-0 w-[1536px]" data-name="Body">
      <CareTeam />
    </div>
  );
}

function Icon10() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Icon">
          <path d="M3 9H15" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M3 4.5H15" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M3 13.5H15" id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Button15() {
  return (
    <div className="relative rounded-[12px] shrink-0 size-[32px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Icon10 />
      </div>
    </div>
  );
}

function Text13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[13.406px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start relative size-full">
        <p className="font-['Inter:Bold',sans-serif] font-bold leading-[20px] not-italic relative shrink-0 text-[14px] text-white whitespace-nowrap">M</p>
      </div>
    </div>
  );
}

function Sidebar1() {
  return (
    <div className="bg-[#7c3aed] relative rounded-[12px] shrink-0 size-[32px]" data-name="Sidebar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <Text13 />
      </div>
    </div>
  );
}

function Sidebar2() {
  return (
    <div className="flex-[1_0_0] h-[28px] min-h-px min-w-px relative" data-name="Sidebar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <p className="absolute font-['Inter:Bold',sans-serif] font-bold leading-[28px] left-0 not-italic text-[#020817] text-[18px] top-[-1px] whitespace-nowrap">MantraCare</p>
      </div>
    </div>
  );
}

function Container57() {
  return (
    <div className="h-[32px] relative shrink-0 w-[139.406px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center overflow-clip relative rounded-[inherit] size-full">
        <Sidebar1 />
        <Sidebar2 />
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <div className="h-[60px] relative shrink-0 w-[255px]" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-[#e2ecf5] border-b border-solid inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-center pb-px pl-[12px] relative size-full">
        <Button15 />
        <Container57 />
      </div>
    </div>
  );
}

function Icon11() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p275d2400} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p21a7e80} id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text14() {
  return (
    <div className="h-[20px] relative shrink-0 w-[38.5px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">Home</p>
      </div>
    </div>
  );
}

function NavItem() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon11 />
          <Text14 />
        </div>
      </div>
    </div>
  );
}

function Icon12() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p383b2000} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text15() {
  return (
    <div className="h-[20px] relative shrink-0 w-[65.859px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">Care Team</p>
      </div>
    </div>
  );
}

function NavItem1() {
  return (
    <div className="bg-[#00c0ff] h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon12 />
          <Text15 />
        </div>
      </div>
    </div>
  );
}

function Icon13() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d="M6.66667 1.66667V5" id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M13.3333 1.66667V5" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p1da67b80} id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M2.5 8.33333H17.5" id="Vector_4" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text16() {
  return (
    <div className="h-[20px] relative shrink-0 w-[90.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">Appointments</p>
      </div>
    </div>
  );
}

function NavItem2() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon13 />
          <Text16 />
        </div>
      </div>
    </div>
  );
}

function Icon14() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p14eb5b80} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3fe63d80} id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text17() {
  return (
    <div className="h-[20px] relative shrink-0 w-[33.109px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">Tasks</p>
      </div>
    </div>
  );
}

function NavItem3() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon14 />
          <Text17 />
        </div>
      </div>
    </div>
  );
}

function Icon15() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p140c1100} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M15 14.1667V7.5" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10.8333 14.1667V4.16667" id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M6.66667 14.1667V11.6667" id="Vector_4" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text18() {
  return (
    <div className="h-[20px] relative shrink-0 w-[49.625px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">Insights</p>
      </div>
    </div>
  );
}

function NavItem4() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon15 />
          <Text18 />
        </div>
      </div>
    </div>
  );
}

function Icon16() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.p1cf7de80} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p3ebe9ac0} id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 14.5833V5.41667" id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text19() {
  return (
    <div className="h-[20px] relative shrink-0 w-[39.703px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">Billing</p>
      </div>
    </div>
  );
}

function NavItem5() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon16 />
          <Text19 />
        </div>
      </div>
    </div>
  );
}

function Container58() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[250px] items-start left-[8px] top-[8px] w-[239px]" data-name="Container">
      <NavItem />
      <NavItem1 />
      <NavItem2 />
      <NavItem3 />
      <NavItem4 />
      <NavItem5 />
    </div>
  );
}

function Container59() {
  return <div className="absolute border-[#e2ecf5] border-solid border-t h-px left-[16px] top-[270px] w-[223px]" data-name="Container" />;
}

function Container60() {
  return <div className="absolute border-[#e2ecf5] border-solid border-t h-px left-[16px] top-[335px] w-[223px]" data-name="Container" />;
}

function Icon17() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pdf995c0} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M7.5 15H12.5" id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M8.33333 18.3333H11.6667" id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text20() {
  return (
    <div className="h-[20px] relative shrink-0 w-[99.281px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">Share Feedback</p>
      </div>
    </div>
  );
}

function NavItem6() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon17 />
          <Text20 />
        </div>
      </div>
    </div>
  );
}

function Icon18() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g clipPath="url(#clip0_44_293)" id="Icon">
          <path d={svgPaths.p14d24500} id="Vector" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p22540600} id="Vector_2" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 14.1667H10.0083" id="Vector_3" stroke="var(--stroke-0, #64748B)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
        <defs>
          <clipPath id="clip0_44_293">
            <rect fill="white" height="20" width="20" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function Text21() {
  return (
    <div className="h-[20px] relative shrink-0 w-[51.672px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">Support</p>
      </div>
    </div>
  );
}

function NavItem7() {
  return (
    <div className="h-[40px] relative rounded-[16px] shrink-0 w-full" data-name="NavItem">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Icon18 />
          <Text21 />
        </div>
      </div>
    </div>
  );
}

function Container61() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[2px] h-[82px] items-start left-[8px] top-[348px] w-[239px]" data-name="Container">
      <NavItem6 />
      <NavItem7 />
    </div>
  );
}

function Icon19() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Icon">
      <svg className="absolute block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Icon">
          <path d={svgPaths.pc4ad940} id="Vector" stroke="var(--stroke-0, #059669)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d="M10 6.66667V17.5" id="Vector_2" stroke="var(--stroke-0, #059669)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p24a96bc0} id="Vector_3" stroke="var(--stroke-0, #059669)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
          <path d={svgPaths.p2c64b180} id="Vector_4" stroke="var(--stroke-0, #059669)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.66667" />
        </g>
      </svg>
    </div>
  );
}

function Text22() {
  return (
    <div className="h-[20px] relative shrink-0 w-[148.297px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#059669] text-[14px] text-center whitespace-nowrap">Invite a friend, Earn $15</p>
      </div>
    </div>
  );
}

function NavItem8() {
  return (
    <div className="absolute content-stretch flex gap-[12px] h-[40px] items-center left-[8px] pl-[12px] rounded-[16px] top-[283px] w-[239px]" data-name="NavItem">
      <Icon19 />
      <Text22 />
    </div>
  );
}

function Sidebar3() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative w-[255px]" data-name="Sidebar">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container58 />
        <Container59 />
        <Container60 />
        <Container61 />
        <NavItem8 />
      </div>
    </div>
  );
}

function Container62() {
  return (
    <div className="bg-[#2d9cdb] relative rounded-[33554400px] shrink-0 size-[32px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-center relative size-full">
        <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[20px] not-italic relative shrink-0 text-[14px] text-center text-white whitespace-nowrap">R</p>
      </div>
    </div>
  );
}

function Text23() {
  return (
    <div className="h-[20px] relative shrink-0 w-[94.984px]" data-name="Text">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start overflow-clip relative rounded-[inherit] size-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#64748b] text-[14px] text-center whitespace-nowrap">Returning User</p>
      </div>
    </div>
  );
}

function Button16() {
  return (
    <div className="h-[48px] relative rounded-[16px] shrink-0 w-full" data-name="Button">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center pl-[12px] relative size-full">
          <Container62 />
          <Text23 />
        </div>
      </div>
    </div>
  );
}

function Sidebar4() {
  return (
    <div className="h-[65px] relative shrink-0 w-[255px]" data-name="Sidebar">
      <div aria-hidden="true" className="absolute border-[#e2ecf5] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pt-[9px] px-[8px] relative size-full">
        <Button16 />
      </div>
    </div>
  );
}

function Container56() {
  return (
    <div className="absolute bg-white h-[862px] left-0 top-0 w-[256px]" data-name="Container">
      <div className="content-stretch flex flex-col items-start overflow-clip pr-px relative rounded-[inherit] size-full">
        <Sidebar />
        <Sidebar3 />
        <Sidebar4 />
      </div>
      <div aria-hidden="true" className="absolute border-[#e2ecf5] border-r border-solid inset-0 pointer-events-none" />
    </div>
  );
}

export default function MantraCareServicesDashboard() {
  return (
    <div className="bg-white relative size-full" data-name="MantraCare services dashboard">
      <Body />
      <Container56 />
    </div>
  );
}